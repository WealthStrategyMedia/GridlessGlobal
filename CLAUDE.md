# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Static marketing site for Gridless Global, a **project management and energy consulting
firm**. This matters for every word of copy: Gridless Global plans, prices, tenders and
manages energy and construction projects; the physical work is carried out by independent
licensed trade partners it vets, tenders to and manages - never supervising their means and
methods, which is a contractor role and is expressly disclaimed in the Terms.

**Copy rules, non-negotiable:**
- Never write that Gridless Global self-performs, has crews or trades "in-house", or
  employs electricians, roofers or builders. That language was removed deliberately.
- Public pages sell the management value positively - one accountable manager, vetted
  specialists, competitive tendering, superior results at a materially lower total cost.
  Never phrase this as a negative ("we do not do the work"). State affirmatively who does:
  every page for a scope involving regulated work carries the licensed-trade-partner notice,
  driven by `involvesRegulatedWork()` in `src/data/services.ts`.
- The explicit disclosure lives in the Terms, in "Nature of Gridless Global; Project
  Management and Consulting Only". Keep that section and its liability carve-out for trade
  partner acts and omissions intact.

Services covered: energy generation, solar, electrical, roofing, construction. Astro 5 + Tailwind CSS 4, `output: 'static'`, deployed to Netlify's free
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
npm run sync:forms   # refresh Tweeble form snapshots after editing a form there
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

**The supplied logo is already a transparent PNG.** Do not add background removal, recolour
the wordmark or rebuild it as live text — ship the exact artwork. Its wordmark is deep navy
and fails contrast on the dark UI, so `Logo.astro` puts the lockup on a white plate on dark
surfaces; that is the sanctioned fix, not editing the mark.

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

## Tweeble forms and payments (all live)

Contact, the footer subscribe box and `/pay` all post **directly from the browser** to
Tweeble. Their API allows cross-origin requests, so there is no server-side code and no
environment variables in any of these paths. Do not reroute them through a Netlify
function — the direct path costs no invocations and works on any static host.

Field ids (`f_…`) are form-specific and must never be hard-coded. They come from the
committed snapshots `src/data/{payment,contact,newsletter}-form.json`, refreshed with
`npm run sync:forms`, and are resolved **by label** in `src/data/{payments,contact}.ts` so a
renamed field fails the build loudly. Required flags, options and button labels are
rendered from those snapshots too — edit the form in Tweeble, then re-sync.

- `amount` goes to Tweeble in **dollars**, not cents.
- Errors come back as `{ error }` and are user-appropriate — show them verbatim.
- Every submission includes an empty `website_url` honeypot and `sourceUrl`.
- The subscribe box keeps its own copy and button text ("Subscribe"); do not render the
  upstream form name, which reads "Subscribe To Newsletter".
- The contact form's consent checkbox is ours alone and is deliberately not transmitted.

**Payments stay on the page.** Checkout opens in a modal iframe; Tweeble posts back
`{ type: "tweeble:purchase", status, sessionId }`. Cancelling returns the payer to their
filled-in form — never navigate away or send them to a separate cancelled page. The
message listener must keep checking `event.origin`. Keep the "open in a new tab" fallback:
a nested card frame can be blocked in some browsers.

The "Tweeble" wordmark on the checkout card is rendered by Tweeble's page and cannot be
changed here; our modal header carries the Gridless branding instead.

`/quote` is the one form with no Tweeble endpoint yet — it still uses the inert
`PUBLIC_FORMS_ENDPOINT` path in `src/lib/form-client.ts` and degrades to an honest
"not connected" message. Preserve that until an endpoint exists.

The unused Stripe leftovers (`netlify/functions/*`, `/pay/complete`) are kept but dead.

## Blog

`/blog` pulls the Tweeble blog feed at build time **and** again in the browser, so posts
published after a deploy appear without rebuilding. Never make the build fail on a feed
outage — it degrades to the client fetch.

The feed's exact field names are unverified (the account had no posts when this was
written), so `src/lib/blog.ts` normalises each value from a list of plausible names. If the
live payload uses a name not in those lists, a console warning on `/blog` reports the
skipped count — add the real name rather than rewriting the approach. Keep the fallbacks:
branded placeholder for a missing cover, excerpt derived from body text, malformed entries
skipped, dates formatted in `timeZone: 'UTC'` (a date-only string otherwise renders as the
previous day).

`BlogCard.astro` and the `cardMarkup` template inside `blog.astro` render the same card —
one for the build, one for the client refresh. Change both together.

## Events

`/events` mirrors the blog (build-time fetch + client refresh + designed empty state) and
adds ticket and sponsorship purchasing through the same modal pattern as Pay a Bill.

**The purchase request body is inferred, not observed** — no event exists yet and the
endpoints 404 on event lookup before validating. Everything uncertain lives in
`PURCHASE_FIELDS` / `buildPurchaseBody` in `src/lib/events.ts`; correct it there rather
than scattering fixes. `startPurchase` accepts `embedUrl`, `checkoutUrl` or
`clientSecret` in the response and `paymentUrlFrom` picks the frameable one.

Purchase buttons carry their own `data-event-id` / `data-ticket-id` / `data-package-id`.
Do not key them by array index — a grid refresh after a purchase used to make a stale index
resolve to the wrong event.

Keep the `event.origin` check on the `message` listener; it is the only thing stopping
another page from faking a completed purchase.

## Loading indicator and the hero globe

Any wait shows **our** globe mark, never a third party's: `.gg-spinner` for in-page waits
and `PageLoader.astro` for navigations (it holds back 250ms so quick loads never flash).

`SpinningGlobe.astro` must keep the globe image **perfectly circular** — never rotate or
non-uniformly scale it. A flat disc rotated in 3D squashes to an ellipse, which a sphere
never does. The motion comes from the SVG orbit cage of energy arcs spinning around it;
the cursor steers that cage.

## Placeholders to replace before launch

Social links in `src/data/site.ts` still point at generic profiles. The privacy and terms
copy is a template flagged in-page as pending legal review. Phone, email and location are
real.

## Copy constraints: licensure, permits and warranties

Gridless Global is **registered**, not licensed as a contractor in the states it works, and it
does not perform the physical work. Florida reaches work done "by others" for compensation
(Ch. 489) and treats advertising as a contractor as its own violation, so the site copy is part
of the compliance surface, not just marketing. When editing copy anywhere:

- Gridless Global **scopes, prices, tenders, coordinates, tracks, verifies and documents**. It
  never *builds, installs, performs, appoints* or *supervises means and methods*. Prefer
  "help you engage", "the licensed X engaged for your project", "put the work to licensed trades".
- **Permits** are filed and held by the licensed trade performing the work (or the owner as
  owner-builder). Gridless Global tracks them. Never "we file", "we pull", "permits handled by us".
- Never state or imply Gridless Global is licensed. The homepage FAQ is deliberately
  "Who is licensed and insured on my project?" - do not change it back to "Are you licensed?".
- **No single contract and no Gridless Global warranty on physical work.** The owner signs the
  trade partner's own agreement. Workmanship warranties are the trade's; Gridless Global *holds
  and enforces* them.
- The **Gridless Global Guarantee** (`/terms`) is the sanctioned way to say "we stand behind it":
  we warrant our own services, set the warranty terms trades must carry, enforce them, and fund a
  licensed replacement up to the Guarantee Cap. It is deliberately **not** insurance - no separate
  fee, never sold standalone - because a standalone repair-or-replace promise sold for
  consideration is a regulated service warranty under Fla. Stat. Ch. 634. Keep that carve-out.

### Six licence regimes, not one

Copy can trip any of these. Contracting is only the most obvious:

| Regime | Florida | What we may say |
|---|---|---|
| Contracting | Ch. 489 | We scope, tender, coordinate, verify. Trade partners perform the work and carry the permit. |
| Engineering / architecture | Ch. 471 / 481 | Sealed drawings, structural assessment and load calculations belong to a licensed PE or architect engaged for the project - never "our engineers" or "engineers on the team". |
| Home inspection | Ch. 468 Pt XV | "Energy analysis", "condition documentation". Never "pre-sale inspection". |
| Public adjusting | Ch. 626 Pt VI | Document damage and prepare an itemised scope. Never adjust, negotiate or settle a claim, and never offer to deal with the carrier on the client behalf. |
| Service warranty | Ch. 634 | The Gridless Global Guarantee only: no separate fee, never sold standalone. |
| Credit / securities | - | Financing options are modelled and compared, not arranged, originated or brokered. |

Permit expediting - tracking an application, chasing status, collating documents
others produced, monitoring progress as the applicant authorised agent - is lawful
consulting and we do sell it. Preparing permit drawings, submitting, signing, or
acting as qualifying agent for a contractor is not.

Which pages carry the licensed-trade-partner notice is decided by
`involvesRegulatedWork()` in `src/data/services.ts`. It defaults to showing the
notice, so a new service is safe by default; add a slug to `ADVISORY_ONLY_SLUGS`
only when the scope genuinely involves no permitted work.

`npm run build` enforces all of this through `scripts/check-positioning.mjs`, which reads
the rendered HTML of every built page and fails on claims Gridless Global cannot
lawfully make. Run it on its own with:

```bash
npm run audit:positioning
```

A finding means reword the copy. Never widen a regex to silence one.
Both legal pages still want review by Florida construction-licensing counsel.
