/**
 * Blog feed from Tweeble.
 *
 * Tweeble documents this endpoint as "your published blog posts, newest first,
 * with the full text, cover photo and a link to the original post", but the
 * account has no posts yet, so the exact field names cannot be observed. Rather
 * than guess one spelling and silently render blank cards on the day the first
 * post goes live, every field is read through a list of plausible names and
 * normalised into one shape. When the real payload arrives, check the console
 * warning below - it names any post that could not be given a title.
 *
 * The feed is fetched twice: once at build time so the page ships with content
 * already in the HTML (good for search engines and first paint), and again in
 * the browser so posts published after the last deploy appear without anyone
 * having to rebuild the site.
 */

export const BLOG_ENDPOINT =
  import.meta.env.PUBLIC_TWEEBLE_BLOG_URL ??
  'https://www.tweeble.com/api/public/97c3ca18-82e4-4e1a-900a-f91339eefb81/blog';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string | null;
  imageAlt: string;
  url: string | null;
  author: string | null;
  date: string | null;
  /** Pre-formatted for display, e.g. "Sep 1, 2026". */
  dateLabel: string | null;
}

/** Returns the first value present under any of the given keys. */
function pick(source: Record<string, unknown>, keys: string[]): unknown {
  for (const key of keys) {
    const value = source[key];
    if (value !== undefined && value !== null && value !== '') return value;
  }
  return undefined;
}

function asText(value: unknown): string | null {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  // Authors and images often arrive as objects.
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    const nested = pick(obj, ['name', 'title', 'fullName', 'displayName', 'url', 'src', 'href']);
    if (typeof nested === 'string') return nested;
  }
  return null;
}

/** Strips HTML and collapses whitespace, so an excerpt can be built from body text. */
function toPlainText(value: string): string {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#3[49];/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text: string, max = 190): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, '') + '...';
}

function formatDate(value: string | null): string | null {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  // Formatted in UTC deliberately. A date-only string like "2026-08-16" parses
  // as UTC midnight, so formatting it in a timezone behind UTC would render the
  // previous day - a published date that is visibly wrong.
  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** Turns one raw feed entry into the shape the cards render. */
export function normalisePost(raw: unknown, index: number): BlogPost | null {
  if (!raw || typeof raw !== 'object') return null;
  const item = raw as Record<string, unknown>;

  const title = asText(pick(item, ['title', 'name', 'heading', 'postTitle']));
  if (!title) return null;

  const body = asText(pick(item, ['content', 'body', 'html', 'text', 'postContent', 'fullText'])) ?? '';
  const summary = asText(pick(item, ['excerpt', 'summary', 'description', 'subtitle', 'preview', 'snippet']));

  const image = asText(
    pick(item, [
      'coverImage', 'coverPhoto', 'image', 'imageUrl', 'featuredImage',
      'thumbnail', 'photo', 'cover', 'banner',
    ])
  );

  const url = asText(pick(item, ['url', 'link', 'permalink', 'postUrl', 'href', 'externalUrl', 'shareUrl']));

  const author = asText(pick(item, ['author', 'authorName', 'by', 'writer', 'createdBy', 'accountName']));

  const date = asText(
    pick(item, ['publishedAt', 'publishedDate', 'date', 'createdAt', 'postedAt', 'updatedAt'])
  );

  const excerptSource = summary || (body ? toPlainText(body) : '');

  return {
    id: asText(pick(item, ['id', 'slug', 'uuid', '_id'])) ?? `post-${index}`,
    title: toPlainText(title),
    excerpt: excerptSource ? truncate(toPlainText(excerptSource)) : '',
    image,
    imageAlt: '',
    url,
    author,
    date,
    dateLabel: formatDate(date),
  };
}

/** Accepts a bare array or a wrapped `{ data | posts | items | results }` payload. */
export function normaliseFeed(payload: unknown): BlogPost[] {
  let list: unknown = payload;
  if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
    list = pick(payload as Record<string, unknown>, ['data', 'posts', 'items', 'results', 'blog']);
  }
  if (!Array.isArray(list)) return [];

  const posts: BlogPost[] = [];
  let skipped = 0;
  list.forEach((entry, index) => {
    const post = normalisePost(entry, index);
    if (post) posts.push(post);
    else skipped += 1;
  });

  if (skipped > 0 && typeof console !== 'undefined') {
    console.warn(
      `[gridless] ${skipped} blog post(s) had no recognisable title and were skipped. ` +
        `Check the field names in src/lib/blog.ts against the live feed.`
    );
  }

  // The API documents newest-first, but sort defensively where dates exist.
  return posts.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/** Fetches and normalises the feed. Never throws - an empty list is a valid state. */
export async function fetchPosts(signal?: AbortSignal): Promise<BlogPost[]> {
  const response = await fetch(BLOG_ENDPOINT, { headers: { Accept: 'application/json' }, signal });
  if (!response.ok) throw new Error(`Blog feed returned HTTP ${response.status}`);
  return normaliseFeed(await response.json());
}
