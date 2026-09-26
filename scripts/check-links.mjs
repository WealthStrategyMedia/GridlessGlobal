/**
 * Post-build audit of the static output.
 *
 * Walks every HTML file in dist/ and checks that internal links resolve to a
 * real page or asset, that images carry alt text, that each page has exactly
 * one h1, and that element ids are unique. Run after `npm run build`:
 *
 *   node scripts/check-links.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const files = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
})(DIST);

const exists = (p) => fs.existsSync(p);
const resolves = (href) => {
  const clean = href.split('#')[0].split('?')[0];
  if (!clean || clean === '/') return exists(path.join(DIST, 'index.html'));
  const base = path.join(DIST, clean);
  return exists(base) || exists(base + '.html') || exists(path.join(base, 'index.html'));
};

const problems = [];
let linkCount = 0;
let imgCount = 0;

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const page =
    '/' +
    path
      .relative(DIST, file)
      .split(path.sep)
      .join('/')
      .replace(/index\.html$/, '')
      .replace(/\.html$/, '');

  // Links
  for (const m of html.matchAll(/<a\b[^>]*?href="([^"]*)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|tel:|#|data:)/.test(href)) continue;
    linkCount++;
    if (!resolves(href)) problems.push(`${page}  broken link -> ${href}`);
  }

  // Asset references
  for (const m of html.matchAll(/\b(?:src|srcset)="([^"]*)"/g)) {
    for (const part of m[1].split(',')) {
      const url = part.trim().split(/\s+/)[0];
      if (!url || /^(https?:|data:)/.test(url)) continue;
      if (!exists(path.join(DIST, url.split('?')[0]))) problems.push(`${page}  missing asset -> ${url}`);
    }
  }

  // Images need alt (empty alt is fine: it marks the image decorative)
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    imgCount++;
    if (!/\balt=/.test(m[0])) problems.push(`${page}  <img> without alt -> ${m[0].slice(0, 90)}`);
  }

  // Exactly one h1
  const h1s = [...html.matchAll(/<h1\b/g)].length;
  if (h1s !== 1) problems.push(`${page}  expected 1 <h1>, found ${h1s}`);

  // Unique ids
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) problems.push(`${page}  duplicate id(s) -> ${[...new Set(dupes)].join(', ')}`);

  // Titles and descriptions
  if (!/<title>[^<]{5,}<\/title>/.test(html)) problems.push(`${page}  missing or short <title>`);
  if (!/<meta name="description" content="[^"]{30,}"/.test(html)) problems.push(`${page}  missing or short meta description`);
}

console.log(`Checked ${files.length} pages, ${linkCount} internal links, ${imgCount} images.`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  for (const p of problems) console.log('  - ' + p);
  process.exit(1);
}
console.log('No problems found.');
