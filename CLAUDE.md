# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Static marketing site for Gridless Global, an **owner-side project advisory and
administration firm**. This matters for every word of copy. Gridless is the owner's
project command center: it organizes project information, coordinates communications,
maintains documentation, tracks budgets and reported milestones, and gives the owner
visibility and decision support. It does **not** perform, tender, appoint, supervise,
direct, schedule or control regulated work. The owner contracts directly with
appropriately licensed independent contractors, engineers and design professionals, who
remain responsible for their own scopes.

**Copy rules, non-negotiable:**
- Gridless **organizes, coordinates, documents, tracks, compares, summarizes and reports**.
  It never installs, builds, performs, tenders, bids, appoints, supervises, oversees,
  sequences or schedules regulated work, and never controls means, methods or jobsite safety.
- Use "manage" carefully. "Project management" is allowed **only** when the object is the
  owner's project *process*: information, documentation, communications, decisions, budgets,
  invoices, provider-reported schedules and milestones, meetings, requirements, closeout and
  warranty records. It is never allowed for construction means and methods, workers,
  subcontractors, field operations, jobsite safety, technical execution, trade sequencing,
  workmanship, code compliance or a contractor's employees.
- Never write that Gridless replaces an owner-builder's supervision - e.g. "acts as the project
  manager so the homeowner does not have to supervise the work". Florida requires the
  owner-builder to give direct onsite supervision and forbids delegating it to an unlicensed
  person. California CSLB treats a consultant who provides or oversees construction bidding, or
  who both arranges contractor schedules and keeps project oversight, as a contractor.
- Company-level category: **Owner-Side Project Advisory, Coordination & Administration**. Do not
  append "Advisory" to individual service titles - pages use plain project categories
  ("Roofing Projects", "Electrical Projects"), with the role line under the title carrying the
  model.
- Lead with what Gridless **does**, not what it does not do. The role disclosure supports the
  positioning; it never becomes the positioning, and it never sits in a hero.
- Never state or imply that Gridless holds a trade or professional licence, and never claim
  licensing is unnecessary. Requirements vary by jurisdiction; Gridless limits its scope.
- Gridless gives **no warranty or guarantee of any kind**, on the work or on its own services.
  Warranties belong to the performing contractor and the manufacturer. The most we say is that
  we help organize and centralize that paperwork.
- Gridless invoices **advisory and administration fees only** - never construction deposits,
  material deposits, mobilisation, progress payments, retainage or draws. Third-party
  providers invoice the owner directly. Changes to our own scope are a **Service Amendment**,
  never a construction change order.
- Gridless is **not a public adjuster**: documentation and scope organization only, never
  preparing, filing, negotiating or settling a claim, and never contingent on recovery.

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
- **Gridless Global gives no warranty or guarantee of any kind.** Not on the physical work,
  not on its own services, not as a branded programme. There was briefly a "Gridless Global
  Guarantee"; the owner removed it. Do not reintroduce it in any form, including softer
  phrasings like "warranty desk", "we enforce it" or "held and enforced by us".
  Warranties belong to the performing trade and the equipment manufacturer. The most we say
  is that we collect and register that paperwork in the client name, which `/terms` states
  is a clerical act creating no obligation.

### Six licence regimes, not one

Copy can trip any of these. Contracting is only the most obvious:

| Regime | Florida | What we may say |
|---|---|---|
| Contracting | Ch. 489 | We organize and coordinate. Owners contract directly with licensed contractors, who perform the work and carry the permit. |
| Engineering / architecture | Ch. 471 / 481 | Sealed drawings, structural assessment and load calculations belong to a licensed PE or architect engaged for the project - never "our engineers". |
| Home inspection | Ch. 468 Pt XV | "Condition documentation", "energy analysis". Never "pre-sale inspection". |
| Public adjusting | Ch. 626 Pt VI | Document and organize. Never adjust, negotiate or settle, and never deal with the carrier for the owner. |
| Service warranty | Ch. 634 | Nothing. We give no warranty, so none is offered or sold. |
| Credit / securities | - | Financing options are modelled and compared, never arranged, originated or brokered. |

Permit expediting - tracking an application, chasing status, collating documents others
produced, monitoring status - is lawful and we do sell it. Preparing permit drawings,
submitting, signing, or acting as qualifying agent is not.

California and Florida both have specific sections in `/terms`. California in particular may
treat providing or overseeing construction bids, or arranging contractor schedules while
keeping oversight, as contracting - so those are off the table sitewide, not just in CA.

Which pages carry the role disclosure is decided by `involvesRegulatedWork()` in
`src/data/services.ts`; it defaults to showing, so a new service is safe by default. The
public-adjuster paragraph is triggered by storm/claim content on the page itself.

`npm run build` enforces all of this through `scripts/check-positioning.mjs`, which reads
the rendered HTML of every page and fails on claims Gridless cannot lawfully make. Run alone:

```bash
npm run audit:positioning
```

A finding means reword the copy. Never widen a regex to silence one.
Both legal pages still want review by Florida construction-licensing counsel.
