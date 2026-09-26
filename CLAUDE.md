# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Static marketing site for Gridless Global (energy generation, solar, electrical, roofing,
construction). Astro 5 + Tailwind CSS 4, `output: 'static'`, deployed to Netlify's free
tier. Two Netlify Functions handle payments and optional form relay — everything else is
prerendered HTML.

Read `README.md` first; it covers setup, deployment and how to connect forms and payments.

## Commands

```bash
npm run dev          # dev server
npm run build        # astro check + build + audit dist/  <- use this before claiming done
npm run audit        # link / alt / heading / meta audit of dist/
npm run assets       # regenerate brand assets from Context/ (rarely needed)
npm run measure-map  # re-measure services map hotspots (only if artwork changes)
```

`npm run build` is the gate: it typechecks, builds and audits. It must pass clean.

## Architecture notes

**Content is data, not markup.** Services live in `src/data/services-{pillars,energy,trades}.ts`
and are assembled by `src/data/services.ts`. Adding an entry automatically produces
`/services/<slug>`, and adds it to the services index, sitemap and related rails. Company
details and navigation live in `src/data/site.ts`. Prefer editing data over editing pages.

**The services map is pixel-aligned.** `mapButtons` and `mapHighlights` in
`src/data/services.ts` are percentage rectangles measured from the artwork's actual pixels.
Do not hand-adjust them; if the artwork changes, run `npm run measure-map`. The module
calls `requireService()` on every hotspot, so a renamed slug fails the build rather than
shipping a dead link — keep that guard.

**Generated assets are committed.** `public/images/*` is derived from `Context/` by
`scripts/prepare-assets.mjs`. Do not edit those files by hand; change the script and re-run
it. Netlify does not run it.

## Conventions

- Layout width: use the `.shell` class (wide — `max-w-[1840px]` with responsive gutters).
  The brief calls for most of the viewport width with a small gutter.
- Colours come from the `@theme` tokens in `src/styles/global.css` (`navy-*`, `brand-*`,
  `signal-*`, `gold-*`, `ink*`). They are sampled from the brand artwork. Do not introduce
  ad-hoc hex values.
- Reusable surfaces: `.panel`, `.panel-hover`, `.aurora`, `.grid-lines`, `.eyebrow`,
  `.rule`, `.text-gradient`, `.reveal`.
- Prose in page copy uses plain hyphens rather than typographic dashes, for consistency
  with the existing content.

## Traps worth knowing

- **Do not pass `hidden` into `<Button>` or `<Logo>`.** Both set `inline-flex`, and
  Tailwind emits `inline-flex` after `hidden`, so the element stays visible. Put
  responsive display classes on a wrapper element. This previously duplicated the header
  and caused horizontal overflow on phones.
- **Negative insets cause phantom horizontal scroll.** `.aurora::before` deliberately has
  no horizontal bleed for this reason. Check `document.documentElement.scrollWidth` against
  `clientWidth` at 320px after layout changes.
- **`break-words` does not reduce intrinsic width.** For long unbroken strings such as
  email addresses inside flex items, use `min-w-0` plus `[overflow-wrap:anywhere]`.
- **Astro `<script>` is a module and is deferred.** The reveal animation has a scroll-based
  safety net so content is never stranded invisible; keep that behaviour if you touch
  `BaseLayout.astro`.
- **Browser-pane measurements are unreliable while the pane is hidden.** `IntersectionObserver`
  and `requestAnimationFrame` are throttled in a hidden document, which makes reveal state
  and computed styles look broken when they are not. Take a screenshot to force a paint
  before trusting such a reading.

## Interactive 3D models

The three power-plant pages embed live models from Energy Encyclopedia via
`src/components/ModelViewer.astro`, driven by the `models` array on a service.
The active model's iframe is **rendered server-side** so it loads with the page
and needs no interaction; additional tabs create theirs on selection. Do not
reintroduce a launch/click-to-load step — the user asked specifically for the
model to be running when the page is first seen.

Two standing caveats, both recorded in README.md: permission to embed these
third-party models is not yet confirmed with Simopt s.r.o., and the models are
heavy, so every visitor to those pages downloads one.

Note: once a model is running, this environment's screenshot capture stops
producing frames for that tab. That is a capture limitation, not a site bug —
verify those pages with `get_page_text` and DOM measurements instead.

## Not yet connected

Forms and payments are complete but intentionally inert until credentials exist. Both
degrade to a clear, honest message rather than failing silently — preserve that behaviour.

- Forms: set `PUBLIC_FORMS_ENDPOINT`. See `src/lib/form-client.ts`.
- Payments: set `PAYMENTS_PROVIDER=stripe` and `STRIPE_SECRET_KEY`. See
  `netlify/functions/create-checkout-session.mts`. A `tweeble` branch is stubbed for the
  planned integration.

## Placeholders to replace before launch

Phone, email, address and social links in `src/data/site.ts`; the privacy and terms copy,
which is a template flagged in-page as pending legal review.
