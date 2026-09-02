# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # vite build + scripts/postbuild.mjs (prerender, sitemap, robots)
npm run preview  # serve the production build
```

There is no test suite. `npm run build` is the closest thing — the postbuild
step imports the data modules directly, so a malformed `services.js` or
`serviceAreas.js` fails the build rather than shipping broken routes.

## What this site is

Marketing and booking site for Air Quality Masters, an HVAC contractor in
Oakland Park, FL. It replaces a purchased template whose demo content had been
left in place — fake team members, invented statistics, two conflicting phone
numbers. **The entire point of this rebuild is trustworthiness**, so the
architecture enforces it rather than relying on care.

## The core rule: unverified facts do not render

`src/data/company.js` is the single source of truth for every factual claim.
Anything set to `null` is a fact nobody has confirmed, and **every component
that consumes it is written to render nothing when it is absent**.

That is deliberate, not an oversight. Do not:
- invent a licence number, founding year, review count, hours or warranty terms
- add a "Licensed & Insured" badge that is not driven by `company.insured`
- write copy that implies a credential the data does not carry
- add stock photos of people, or named team members

When a fact gets verified, set it in `company.js` and the corresponding UI
appears on its own. See `GOING-LIVE.md` for what still needs verifying.

## Architecture

Vite + React 19 + React Router 7. Plain CSS, no framework.

- `src/App.jsx` — routes. All pages nest under `components/Layout.jsx`.
- `src/data/` — `company.js`, `services.js`, `serviceAreas.js`, `faqs.js`.
  These drive the nav, the footer, the sitemap and the prerendered routes.
  **Adding a service or a featured area needs no other change** — add the entry
  and it propagates everywhere, including `scripts/postbuild.mjs`.
- `src/lib/seo.js` — `<head>` management and `LocalBusiness` JSON-LD. Optional
  schema fields are omitted when the underlying fact is unverified, because
  structured data that contradicts the page is penalised.
- `scripts/postbuild.mjs` — writes one real HTML file per route with that
  route's title, description and canonical baked in. Crawlers and link
  unfurlers read `<head>` before running JS, so without this every route would
  serve the home page's metadata. React still hydrates and takes over routing.

## Conventions that matter

**Animation.** Use `fromTo`, never `from`, for GSAP intro tweens. React
StrictMode double-invokes effects, and a `from` tween reads its end value off
the inline style the first run already zeroed — which animates 0 → 0 and leaves
the element invisible. This bug already happened once on the home hero.

Scroll reveals use `hooks/useReveal.js` (IntersectionObserver), not
ScrollTrigger, so they re-arm cleanly on route change. Everything is disabled
under `prefers-reduced-motion`.

**CSS.**
- Display metrics (`line-height`, `letter-spacing`) live on the base `h1, h2`
  rule, not on a list of section selectors. A per-section list silently drops
  headings added later and leaves them on the 1.6 body line-height.
- `max-width` in `ch` must sit on the element carrying the large font-size. On
  a wrapper it resolves against 16px body text.
- Grids using the 1px-gap-over-tinted-background technique must have an item
  count that divides evenly into the track count — `auto-fit` only collapses
  tracks empty in *every* row, so leftovers show as grey rectangles. Where the
  count varies (`.trust-badges`, `.credentials-grid`), give each item its own
  border and use a normal gap instead.

**The accent colour.** `--signal` (#cf3b26) is reserved for actions only: call,
submit, request service. Nothing decorative uses it. That is what keeps it
meaning "act" wherever it appears. Use `--cold` for links and cool emphasis.

**Copy.** Write about the business, never about the website. The version this
replaced shipped lines like "Years of experience currently presented by Air
Quality Masters" and "The current AQM website advertises 24/7 team support" —
build notes that made it to production and undercut every claim on the page.

## Form

`components/ServiceRequestForm.jsx` posts to Web3Forms via
`VITE_WEB3FORMS_KEY`. Without the key it renders a panel pointing at the phone
number rather than a form that fails silently. Keep that behaviour — a booking
form that drops requests is worse than no form.
