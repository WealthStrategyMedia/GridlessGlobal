/**
 * Events feed and purchase flow (Tweeble).
 *
 * ---------------------------------------------------------------------------
 * UNVERIFIED CONTRACT - READ BEFORE THE FIRST REAL EVENT GOES LIVE
 *
 * The account has no published events yet, and the purchase endpoints check
 * that the event exists before validating anything else, so a request with a
 * placeholder id returns "This event isn't available" rather than naming the
 * fields it wanted. That means the *response* shape is documented by Tweeble
 * but the *request* field names below are inferred, not observed.
 *
 * Everything uncertain is gathered in PURCHASE_FIELDS and buildPurchaseBody so
 * it can be corrected in one place, in seconds, once a single real event
 * exists. Run scripts/check-events.mjs against a live event to confirm.
 *
 * What Tweeble does document:
 *   "Purchases never use Stripe's hosted checkout page. Each purchase call
 *    returns a clientSecret (for Stripe.js initEmbeddedCheckout on your page)
 *    and an embedUrl (a Tweeble-hosted card form for an iframe)."
 *   "Money is always an integer in US cents."
 * ---------------------------------------------------------------------------
 */

const ACCOUNT = import.meta.env.PUBLIC_TWEEBLE_ACCOUNT_ID ?? '97c3ca18-82e4-4e1a-900a-f91339eefb81';
const API_BASE = `https://www.tweeble.com/api/public/${ACCOUNT}`;

export const EVENTS_ENDPOINT = `${API_BASE}/events`;

export const ticketPurchaseUrl = (eventId: string) =>
  `${API_BASE}/events/${encodeURIComponent(eventId)}/purchase`;

export const sponsorshipPurchaseUrl = (eventId: string, packageId: string) =>
  `${API_BASE}/events/${encodeURIComponent(eventId)}/sponsorships/${encodeURIComponent(packageId)}/purchase`;

/* ========================================================================== *
 * Types
 * ========================================================================== */

export interface TicketTier {
  id: string | null;
  name: string;
  priceCents: number | null;
  description: string;
  soldOut: boolean;
  maxPerOrder: number;
}

export interface SponsorPackage {
  id: string;
  name: string;
  priceCents: number | null;
  description: string;
  benefits: string[];
  soldOut: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  summary: string;
  image: string | null;
  url: string | null;
  start: string | null;
  end: string | null;
  dateLabel: string | null;
  timeLabel: string | null;
  venue: string | null;
  city: string | null;
  region: string | null;
  locationLabel: string | null;
  isOnline: boolean;
  priceFromCents: number | null;
  tickets: TicketTier[];
  sponsorships: SponsorPackage[];
  soldOut: boolean;
  past: boolean;
}

/* ========================================================================== *
 * Tolerant readers - the feed's exact spelling is unconfirmed
 * ========================================================================== */

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
  if (value && typeof value === 'object') {
    const nested = pick(value as Record<string, unknown>, ['name', 'title', 'url', 'src', 'href', 'label']);
    if (typeof nested === 'string') return nested;
  }
  return null;
}

function plain(value: string): string {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text: string, max = 170): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const space = cut.lastIndexOf(' ');
  return (space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[,;:.\s]+$/, '') + '...';
}

/** Money is documented as integer cents, but tolerate a dollar figure too. */
function asCents(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Number.isInteger(value) ? value : Math.round(value * 100);
  }
  if (typeof value === 'string') {
    const cleaned = value.replace(/[^0-9.]/g, '');
    if (!cleaned) return null;
    const n = Number(cleaned);
    if (!Number.isFinite(n)) return null;
    return value.includes('.') ? Math.round(n * 100) : Math.round(n);
  }
  return null;
}

export const formatMoney = (cents: number | null): string =>
  cents == null ? '' : cents === 0 ? 'Free' : `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;

const asBool = (value: unknown): boolean =>
  value === true || value === 'true' || value === 1 || value === '1';

/** Dates are formatted in UTC so a date-only value never shifts a day. */
function formatDate(value: string | null): string | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  });
}

function formatTime(value: string | null): string | null {
  if (!value || !/\d{2}:\d{2}/.test(value)) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' }) + ' UTC';
}

/* ========================================================================== *
 * Normalising
 * ========================================================================== */

function normaliseTicket(raw: unknown, index: number): TicketTier | null {
  if (!raw || typeof raw !== 'object') return null;
  const t = raw as Record<string, unknown>;
  const name = asText(pick(t, ['name', 'title', 'label', 'type', 'tierName'])) ?? `Ticket ${index + 1}`;
  const priceCents = asCents(
    pick(t, ['priceCents', 'amountCents', 'price', 'amount', 'cost', 'unitPriceCents'])
  );
  const max = Number(pick(t, ['maxPerOrder', 'maxQuantity', 'limit', 'maxPerPurchase']) ?? 0);
  return {
    id: asText(pick(t, ['id', 'ticketId', 'tierId', 'slug'])),
    name: plain(name),
    priceCents,
    description: plain(asText(pick(t, ['description', 'summary', 'details'])) ?? ''),
    soldOut: asBool(pick(t, ['soldOut', 'sold_out', 'unavailable'])),
    maxPerOrder: Number.isFinite(max) && max > 0 ? Math.min(max, 20) : 10,
  };
}

function normaliseSponsorship(raw: unknown, index: number): SponsorPackage | null {
  if (!raw || typeof raw !== 'object') return null;
  const s = raw as Record<string, unknown>;
  const id = asText(pick(s, ['id', 'packageId', 'sponsorshipId', 'slug']));
  if (!id) return null;
  const benefitsRaw = pick(s, ['benefits', 'includes', 'perks', 'features']);
  return {
    id,
    name: plain(asText(pick(s, ['name', 'title', 'label'])) ?? `Package ${index + 1}`),
    priceCents: asCents(pick(s, ['priceCents', 'amountCents', 'price', 'amount', 'cost'])),
    description: plain(asText(pick(s, ['description', 'summary', 'details'])) ?? ''),
    benefits: Array.isArray(benefitsRaw)
      ? benefitsRaw.map((b) => plain(asText(b) ?? '')).filter(Boolean)
      : [],
    soldOut: asBool(pick(s, ['soldOut', 'sold_out', 'unavailable', 'taken'])),
  };
}

export function normaliseEvent(raw: unknown, index: number): EventItem | null {
  if (!raw || typeof raw !== 'object') return null;
  const e = raw as Record<string, unknown>;

  const title = asText(pick(e, ['title', 'name', 'eventName', 'heading']));
  if (!title) return null;

  const id = asText(pick(e, ['id', 'eventId', 'uuid', 'slug'])) ?? `event-${index}`;
  const body = asText(pick(e, ['description', 'summary', 'details', 'content', 'body'])) ?? '';

  const start = asText(pick(e, ['startsAt', 'startDate', 'start', 'startTime', 'date', 'eventDate']));
  const end = asText(pick(e, ['endsAt', 'endDate', 'end', 'endTime']));

  const city = asText(pick(e, ['city', 'locality', 'town']));
  const region = asText(pick(e, ['state', 'region', 'province', 'stateCode']));
  const venue = asText(pick(e, ['venue', 'venueName', 'location', 'place', 'address']));
  const isOnline = asBool(pick(e, ['isOnline', 'online', 'virtual', 'isVirtual']));

  const ticketsRaw = pick(e, ['tickets', 'ticketTypes', 'ticketTiers', 'tiers', 'ticketOptions']);
  const tickets = Array.isArray(ticketsRaw)
    ? (ticketsRaw.map(normaliseTicket).filter(Boolean) as TicketTier[])
    : [];

  const sponsorsRaw = pick(e, ['sponsorships', 'sponsorshipPackages', 'sponsorPackages', 'packages']);
  const sponsorships = Array.isArray(sponsorsRaw)
    ? (sponsorsRaw.map(normaliseSponsorship).filter(Boolean) as SponsorPackage[])
    : [];

  // A single price on the event itself is treated as one implicit tier.
  const flatPrice = asCents(pick(e, ['priceCents', 'ticketPriceCents', 'price', 'ticketPrice', 'amount']));
  if (!tickets.length && flatPrice != null) {
    tickets.push({
      id: null,
      name: 'General admission',
      priceCents: flatPrice,
      description: '',
      soldOut: false,
      maxPerOrder: 10,
    });
  }

  const prices = tickets.map((t) => t.priceCents).filter((p): p is number => p != null);
  const startDate = start ? new Date(start) : null;

  const locationParts = [venue, [city, region].filter(Boolean).join(', ')].filter(Boolean);

  return {
    id,
    title: plain(title),
    summary: body ? truncate(plain(body)) : '',
    image: asText(pick(e, ['coverImage', 'image', 'imageUrl', 'banner', 'photo', 'thumbnail', 'cover'])),
    url: asText(pick(e, ['url', 'link', 'permalink', 'eventUrl', 'ticketUrl'])),
    start,
    end,
    dateLabel: formatDate(start),
    timeLabel: formatTime(start),
    venue,
    city,
    region,
    locationLabel: isOnline ? 'Online' : locationParts.join(' - ') || null,
    isOnline,
    priceFromCents: prices.length ? Math.min(...prices) : null,
    tickets,
    sponsorships,
    soldOut: asBool(pick(e, ['soldOut', 'sold_out'])) || (tickets.length > 0 && tickets.every((t) => t.soldOut)),
    past: startDate ? !Number.isNaN(startDate.getTime()) && startDate.getTime() < Date.now() : false,
  };
}

export function normaliseEvents(payload: unknown): EventItem[] {
  let list: unknown = payload;
  if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
    list = pick(payload as Record<string, unknown>, ['data', 'events', 'items', 'results']);
  }
  if (!Array.isArray(list)) return [];

  let skipped = 0;
  const events: EventItem[] = [];
  list.forEach((entry, i) => {
    const event = normaliseEvent(entry, i);
    if (event) events.push(event);
    else skipped += 1;
  });

  if (skipped && typeof console !== 'undefined') {
    console.warn(
      `[gridless] ${skipped} event(s) had no recognisable title and were skipped. ` +
        'Check the field names in src/lib/events.ts against the live feed.'
    );
  }

  // Soonest first, with anything already past pushed to the end.
  return events.sort((a, b) => {
    if (a.past !== b.past) return a.past ? 1 : -1;
    if (!a.start || !b.start) return 0;
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });
}

export async function fetchEvents(signal?: AbortSignal): Promise<EventItem[]> {
  const response = await fetch(EVENTS_ENDPOINT, { headers: { Accept: 'application/json' }, signal });
  if (!response.ok) throw new Error(`Events feed returned HTTP ${response.status}`);
  return normaliseEvents(await response.json());
}

/* ========================================================================== *
 * Purchase request - the inferred part
 * ========================================================================== */

/**
 * Field names sent when starting a purchase. These are the single place to
 * correct once a real event confirms the contract.
 */
export const PURCHASE_FIELDS = {
  quantity: 'quantity',
  ticketId: 'ticketId',
  name: 'name',
  email: 'email',
  phone: 'phone',
  company: 'company',
  notes: 'notes',
  sourceUrl: 'sourceUrl',
  honeypot: 'website_url',
} as const;

export interface PurchaseDetails {
  quantity?: number;
  ticketId?: string | null;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  notes?: string;
  honeypot?: string;
}

export function buildPurchaseBody(details: PurchaseDetails): Record<string, unknown> {
  const F = PURCHASE_FIELDS;
  const body: Record<string, unknown> = {
    [F.name]: details.name,
    [F.email]: details.email,
    [F.sourceUrl]: typeof window === 'undefined' ? '' : window.location.href,
    [F.honeypot]: details.honeypot ?? '',
  };
  if (details.quantity != null) body[F.quantity] = details.quantity;
  if (details.ticketId) body[F.ticketId] = details.ticketId;
  if (details.phone) body[F.phone] = details.phone;
  if (details.company) body[F.company] = details.company;
  if (details.notes) body[F.notes] = details.notes;
  return body;
}

export interface PurchaseStart {
  /** Tweeble-hosted card form, made for an iframe. Preferred. */
  embedUrl?: string;
  /** For mounting Stripe Embedded Checkout ourselves, if we ever need to. */
  clientSecret?: string;
  /** Some Tweeble endpoints return a hosted page instead. */
  checkoutUrl?: string;
  orderId?: string;
  error?: string;
}

/** Starts a purchase and returns whatever payment handle Tweeble gives back. */
export async function startPurchase(url: string, details: PurchaseDetails): Promise<PurchaseStart> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(buildPurchaseBody(details)),
  });
  const result = (await response.json().catch(() => ({}))) as PurchaseStart;
  if (!response.ok) {
    throw new Error(result.error || `Purchase could not be started (HTTP ${response.status}).`);
  }
  return result;
}

/** The URL to show in the checkout modal, whichever handle came back. */
export const paymentUrlFrom = (start: PurchaseStart): string | null =>
  start.embedUrl ?? start.checkoutUrl ?? null;
