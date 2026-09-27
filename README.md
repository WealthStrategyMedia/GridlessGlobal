# Gridless Global

Marketing and services site for Gridless Global — energy generation, solar, electrical,
roofing and construction.

Built with [Astro](https://astro.build) 5 and Tailwind CSS 4, output as a fully static
site so it runs comfortably on Netlify's free tier. Payments run client-side against
Tweeble's public API, so nothing server-side is required to take a payment.

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
| `npm run sync:forms` | Refresh all Tweeble form snapshots |

---

## Forms and payments (all live via Tweeble)

Three forms and the payment flow post directly to Tweeble from the browser. Their API
sends `Access-Control-Allow-Origin: *`, so there is **no server-side code and no
environment variables** in any of these paths — they work on any static host.

| Where | Tweeble form | Behaviour |
| --- | --- | --- |
| `/contact` | Contact Gridless Global | Inline success message |
| Footer subscribe | Subscribe To Newsletter | Inline confirmation |
| `/pay` | Make a payment | Opens checkout in a modal on the page |
| `/quote` | — *(not yet supplied)* | Validates, then reports intake is not connected |

We render our own UI for each rather than Tweeble's embed script, so everything matches the
site. Labels, options, required flags, minimum amounts and button text all come from the
committed form snapshots.

### Refreshing after editing a form in Tweeble

```bash
npm run sync:forms
```

That rewrites `src/data/{payment,contact,newsletter}-form.json`. **Do this whenever a form
is edited** — Tweeble's field ids change when fields are added, removed or renamed. Field
ids are never hard-coded; they are resolved from the snapshot **by label**, so a renamed
field fails the build with a message naming it rather than silently posting an incomplete
submission.

### The request shape

Every form uses the same contract:

```jsonc
// POST <submitUrl>
{
  "f_7566ac9b": "Jordan",              // one key per field id
  "website_url": "",                   // honeypot — must stay empty
  "sourceUrl": "https://…/contact",
  "amount": 1249.50                    // payments only, in DOLLARS not cents
}
// 2xx → { message } | { checkoutUrl }   4xx → { error }  (shown to the user verbatim)
```

### The payment flow

Submitting creates a checkout session and opens Tweeble's secure card form **in a modal on
`/pay`** — the payer never leaves the site. Tweeble's checkout posts back to us:

```js
{ type: "tweeble:purchase", status: "cancelled" | …, sessionId }
```

`cancelled` closes the modal and returns the payer to their still-filled form; anything else
shows a success panel in place, with the session id as a reference. The listener checks
`event.origin` against Tweeble's, so a forged message from another page is ignored.

The modal header carries **Gridless Global** branding and both the modal and the form say
"Payments powered by Tweeble". A "Trouble paying? Open in a new tab" link is always present,
because a card form inside a nested frame can be restricted in some browsers — the payer is
never trapped.

> **The "Tweeble" wordmark at the top of the checkout card is rendered by Tweeble's own
> page**, so it cannot be changed from this repo. Our modal header supplies the Gridless
> Global branding above it, and the line item already reads "Make a payment — Gridless
> Global". To replace that wordmark, set the account branding in Tweeble.

> **Unused Stripe leftovers:** `netlify/functions/create-checkout-session.mts`
> (`/api/checkout`), `netlify/functions/submit-form.mts` (`/api/forms`) and `/pay/complete`
> predate Tweeble. Nothing calls them. Keep them only if you may switch providers.

See [`.env.example`](.env.example) for the remaining variables.

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
  sync-tweeble-forms.mjs     Snapshots the live Tweeble form definitions
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
    payments.ts              Payment config and field mapping
    contact.ts               Contact form config and field mapping
    newsletter.ts            Subscribe form config
    *-form.json              Committed snapshots of the live Tweeble forms
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

## Interactive 3D models

The three power-plant service pages embed a live, interactive 3D model of the plant,
running directly on our page — visitors never leave the site:

| Page | Model(s) |
| --- | --- |
| `/services/solar-power-plant` | Solar power plant (PV farm, solar thermal, central tower) |
| `/services/hydro-power-plant` | Hydropower plant · Small hydro |
| `/services/thermal-power-plant` | Geothermal plant · Biomass & biogas |

The models are hosted by **Energy Encyclopedia** (Simopt s.r.o.) and embedded in an
iframe. The model for the active tab is rendered server-side into the HTML, so it starts
loading with the page and is already running when the visitor scrolls to it — there is
nothing to press. On a page with two models, the second is created only when its tab is
selected, so no page pulls down two large WebGL applications at once.

Add or change a model by editing the `models` array on the service in
`src/data/services-*.ts` — no component changes needed:

```ts
models: [
  {
    id: 'solar',
    label: 'Solar power plant',
    url: 'https://3d.energyencyclopedia.com/solar/',
    blurb: 'Explore a photovoltaic farm, a solar thermal plant and a central tower…',
  },
],
```

Other models Energy Encyclopedia publishes that may be worth adding later: **Energy
Efficient House** (`/energy-efficient-house`) would suit `/services/eco-smart-living`, and
there are wind, marine and a large set of nuclear models.

> ### Two things to be aware of
>
> **Permission.** These models are third-party copyrighted works ("Copyright © Simopt,
> s.r.o. All rights reserved"). They set no technical restriction on embedding, and we
> credit and link back on every page, but that is not the same as a licence. **Confirm
> permission with Simopt before launch** — they invite contact on their site. If they
> decline, remove the `models` array from the affected services and the sections disappear
> cleanly.
>
> **Weight.** Each model is a large WebGL application and takes a while to appear on a slow
> connection. Because they now load automatically, every visitor to those three pages
> downloads one. If that ever needs to change, `src/components/ModelViewer.astro` documents
> how to put it back behind a launch control.

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
