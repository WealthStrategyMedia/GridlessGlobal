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
| `npm run sync:payment-form` | Refresh the Tweeble payment-form snapshot |

---

## Forms and payments

Payments are **live**, through Tweeble. Forms are built but still need an intake endpoint.

### 1. Forms — not connected yet

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

### 2. Payments — live

`/pay` is wired to a **Tweeble payment form** and works now. No environment variables and
no server-side code are involved: Tweeble's API sends `Access-Control-Allow-Origin: *`, so
the browser posts straight to their submit endpoint and follows the hosted checkout URL
that comes back. Card details are only ever entered on Tweeble's hosted page.

We render our own UI rather than Tweeble's embed script, so the form matches the rest of
the site. The contract is:

```jsonc
// POST https://www.tweeble.com/api/public/<tenant>/payment-forms/<form>/submit
{
  "amount": 1249.50,                  // dollars, omitted when pricing is fixed
  "f_2d9bbc81": "Project deposit",    // What is this payment for?  (required)
  "f_b9c4b4d2": "INV-10482",          // Invoice or job number      (required)
  "f_f022fb2b": "Jordan Rivera",      // Name on the account        (required)
  "f_10a2fa01": "jordan@example.com", // Email for receipt          (required)
  "f_40577d23": "Deposit for…",       // Note                       (optional)
  "website_url": "",                  // honeypot — must stay empty
  "sourceUrl": "https://…/pay"
}
// 200 → { "checkoutUrl": "…" }   browser is redirected here
// 4xx → { "error": "…" }         shown to the payer verbatim
```

Those `f_…` ids belong to this specific form and change if it is rebuilt in Tweeble, so
they are never hard-coded. They come from a committed snapshot of the form definition.

**After editing the form in Tweeble**, refresh the snapshot:

```bash
npm run sync:payment-form
```

That rewrites `src/data/payment-form.json` with the current fields, required flags,
minimum amount, submit URL and button label — all of which our form renders from. If a
field is renamed, the build fails with a message naming the field, rather than silently
posting an incomplete submission.

To point the site at a different Tweeble form, set `TWEEBLE_PAYMENT_FORM_URL` and re-run
the sync.

> **Note:** "Invoice or job number" is marked **required** in Tweeble, so our form requires
> it too, with a hint suggesting the property address for payers who have no invoice. To
> make it optional, change it in Tweeble and re-run the sync.
>
> **Unused alternative:** `netlify/functions/create-checkout-session.mts` (at
> `/api/checkout`) is a complete Stripe Checkout implementation from before Tweeble was
> chosen. Nothing calls it. Keep it if Stripe may return; otherwise it and its redirect in
> `netlify.toml` can be deleted. `/pay/complete` is likewise only used by that path —
> Tweeble handles its own post-payment page.

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
  sync-payment-form.mjs      Snapshots the live Tweeble payment form
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
    payments.ts              Tweeble payment config and field mapping
    payment-form.json        Committed snapshot of the live payment form
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
