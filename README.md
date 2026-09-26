# Gridless Global

Marketing and services site for Gridless Global — energy generation, solar, electrical,
roofing and construction.

Built with [Astro](https://astro.build) 5 and Tailwind CSS 4, output as a fully static
site so it runs comfortably on Netlify's free tier. The only server-side code is two
Netlify Functions, for payments and (optionally) form intake.

---

## Quick start

```bash
npm install
npm run dev
```

The dev server prints its URL (usually <http://localhost:4321>).

### Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Typecheck, build to `dist/`, then audit the output |
| `npm run build:fast` | Build only — this is what Netlify runs |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run check` | TypeScript / Astro typecheck |
| `npm run audit` | Check `dist/` for broken links, missing alt text, duplicate ids, missing meta |
| `npm run assets` | Regenerate brand assets from `Context/` (see below) |
| `npm run measure-map` | Re-measure the services map hotspots |

---

## What still needs connecting

Two things are deliberately built but not live, because they need credentials:

### 1. Forms

Every form — contact, quote, newsletter — is complete, validated and accessible. Until an
intake endpoint is configured they validate normally and then tell the visitor plainly
that online intake is not connected yet, offering phone and email instead. Nothing is
silently dropped.

**To switch them on**, set one environment variable in Netlify:

```
PUBLIC_FORMS_ENDPOINT = https://your-intake-service/…
```

The browser will then `POST` JSON to that URL:

```jsonc
{
  "formType": "quote",             // contact | quote | newsletter
  "submittedAt": "2026-09-26T…",
  "pageUrl": "https://…/quote",
  "fields": { "firstName": "…", "email": "…", "interest_solar-installation": true }
}
```

If the upstream service needs a secret that must not reach the browser, use the bundled
relay instead — set `PUBLIC_FORMS_ENDPOINT=/api/forms`, plus `FORMS_UPSTREAM_URL` and
`FORMS_UPSTREAM_TOKEN`. That path adds basic rate limiting and honeypot rejection.

No markup changes are needed either way.

### 2. Payments

`/pay` collects everything a checkout session needs and posts it to `/api/checkout`
(`netlify/functions/create-checkout-session.mts`). That function validates the request,
then hands off to the payment provider. Card details are never handled by this site.

Today it returns **503 with a readable message**, which the payment form displays, because
no credentials are set. **To switch it on:**

```
PAYMENTS_PROVIDER = stripe
STRIPE_SECRET_KEY = sk_live_…
```

That is the only change required — the Stripe Checkout integration is already written and
tested. A `tweeble` branch is stubbed in the same file for the planned Tweeble
integration; fill in the request shape once their API is documented.

> On a local `npm run preview` the function does not run, so the form reports that
> checkout is unavailable in this environment. That is expected — it works on a deploy.

See [`.env.example`](.env.example) for the full list of variables.

---

## Deploying to Netlify

[`netlify.toml`](netlify.toml) is already configured:

- Build command `npm run build:fast`, publish directory `dist`
- `/api/checkout` and `/api/forms` redirect to the functions
- Long-lived caching on fingerprinted assets, security headers on everything

Connect the repository in Netlify and it will deploy as-is. Add environment variables under
**Site settings → Environment variables** when you are ready to switch on forms and payments.

---

## Project structure

```
Context/                     Source artwork supplied by the client (not served)
netlify/functions/           Serverless endpoints: payments, form relay
public/images/               Generated, web-optimised brand assets
scripts/
  prepare-assets.mjs         Derives every brand asset from Context/
  measure-map.mjs            Re-measures the services map hotspots
  check-links.mjs            Post-build audit of dist/
src/
  components/                UI components (Header, Footer, ServicesMap, forms, …)
  data/
    site.ts                  Company details, navigation, footer
    service-types.ts         Service type definitions and accent tokens
    services-pillars.ts      The nine services shown on the map
    services-energy.ts       Energy and advisory services
    services-trades.ts       Trades and construction services
    services.ts              Assembles the above + map hotspot geometry
  layouts/                   BaseLayout, LegalLayout
  lib/form-client.ts         Shared form validation and submission runtime
  pages/                     Routes; services/[slug].astro generates 25 pages
  styles/global.css          Design tokens and composed utilities
```

### Editing content

Almost everything is data-driven:

- **Company details, phone, email, address, navigation** → `src/data/site.ts`
- **Services** → the three `services-*.ts` files. Adding an entry automatically creates its
  page at `/services/<slug>`, and adds it to the services index, the sitemap and the
  relevant listings. Add it to `src/data/site.ts` to surface it in the nav too.
- The build **fails** if a map hotspot points at a slug that no longer exists, so a
  rename cannot silently produce a dead link.

> **Placeholders to replace before launch:** phone, email and address in
> `src/data/site.ts`, the social links there, and the privacy/terms text, which is a
> template and has not been reviewed by counsel.

---

## The interactive services map

`Context/Images/Services_Map_Img.png` is the centrepiece of the home and services pages.
Every gold *"Click here for services"* button, and every row in the **Key Highlights**
banner down the left, is a real link to that service's page.

The clickable regions are stored as percentage rectangles in `src/data/services.ts`
(`mapButtons` and `mapHighlights`), measured directly from the artwork's pixels, so the
overlay stays aligned at every viewport width — measured drift is under 1.2 source pixels.

**If the artwork is ever re-exported**, re-measure and paste the results in:

```bash
npm run measure-map
```

Below `lg` the map scrolls horizontally at a usable size rather than shrinking the
hotspots to untappable slivers, and a full card grid sits underneath at every breakpoint —
the primary path on a phone, and a keyboard- and screen-reader-friendly duplicate
everywhere else.

---

## Brand assets

The supplied logo is additive glow painted over a dark grey vignette, so it cannot be
dropped straight onto the navy UI. `scripts/prepare-assets.mjs` estimates that backdrop,
subtracts it, and re-emits the artwork as a transparent cutout, then derives the favicon,
the social card and web-optimised versions of the services map (3.7 MB PNG → 385 KB WebP).

Generated files are committed, so the deploy host never needs to run it. Re-run it only if
the source artwork in `Context/` changes:

```bash
npm run assets
```

The wordmark in the artwork is deep navy and disappears against a dark background, so the
header pairs the globe mark with live typography instead. That also keeps it crisp at every
size and readable to screen readers and search engines.

---

## Accessibility

Targeting WCAG 2.1 AA. Skip link, visible focus rings, full keyboard operation including
the mega menu and the services map, labelled fields with errors tied to their input,
reduced-motion support, and FAQs built on `<details>` so they work without JavaScript.
Content is never left invisible if scripting fails or an animation observer misses.

`npm run audit` checks the built output for broken links, images without `alt`, duplicate
ids, pages without exactly one `<h1>`, and missing titles or meta descriptions. It runs as
part of `npm run build`.
