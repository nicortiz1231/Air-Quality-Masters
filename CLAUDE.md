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
- `src/data/` — `company.js`, `services.js`, `serviceAreas.js`, `faqs.js`,
  `legal.js`, `requestForm.js`. These drive the nav, the footer, the sitemap
  (both `/sitemap` and `sitemap.xml`) and the prerendered routes. **Adding a
  service or a featured area needs no other change** — add the entry and it
  propagates everywhere, including `scripts/postbuild.mjs`.
- `src/data/legal.js` — privacy policy, terms, accessibility statement, as
  structured section trees rendered by `components/LegalDocument.jsx`. Same
  rule as `company.js`: **every statement must describe what the site actually
  does.** The policy says there are no cookies and no analytics because there
  are none. Adding any tracker makes it false and requires editing the policy
  in the same commit.
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

## Visual system

The site's design concept is that an HVAC company sells something invisible, so
the signature visuals make air visible. Three coded pieces, all in
`src/components/visual/`:

- `AirflowField.jsx` — canvas flow field (value-noise + fBm advecting particles
  that leave trails). DPR-capped, paused offscreen via IntersectionObserver,
  one static frame under reduced motion. Resolution-independent, which is why
  it carries the hero rather than the 760px photography.
- `SystemAnatomy.jsx` — interactive cutaway of a split system, drawn as a
  technical section on a blueprint grid. Content lives in `src/data/anatomy.js`.
  The SVG is `aria-hidden`; hotspots are real HTML buttons positioned in
  percentage coordinates off the viewBox, so it is keyboard-operable.
- `ProcessScroller.jsx` — "How a service call works" as a pinned,
  full-viewport scroller. The section is N x 100svh; a sticky stage holds the
  viewport while full-bleed slides take over one at a time. Below 900px, and
  under reduced motion, it renders `ProcessList` instead — a plain stacked
  list. Keep that opt-out: a scroll-hijacking pinned section is unpleasant on a
  phone and hostile to anyone with vestibular sensitivity.

Four bugs already fixed around sticky/scroll; do not reintroduce them:

- **`overflow: hidden` on an ancestor breaks `position: sticky` inside it.**
  `.process` originally clipped its parallax background, which silently killed
  the sticky column.
- **A transformed ancestor also breaks sticky** — it becomes the containing
  block for every descendant. The route entrance animation used to animate
  `transform: translateY(12px)` on `<main>`, which broke the pinned scroller
  for the life of the animation. `.route-enter` now animates opacity only.
- **`100vh` is the LARGE viewport** and can exceed the space actually on
  screen (browser chrome, mobile URL bars), so a "full screen" pinned stage
  overflows. Use `100svh` with a `vh` line before it as the fallback, and
  measure against `window.innerHeight` in JS, never the CSS unit.
- **IntersectionObserver callbacks only carry entries whose state CHANGED.**
  Picking "nearest the viewport centre" from the callback argument alone
  chooses wrong. `ProcessScroller` avoids IO entirely and derives the active
  step from scroll progress through the pinned range, which is exact.

Verifying scroll-driven behaviour in automation: the Chrome automation tab can
end up with a frozen rendering pipeline — no rAF, no scroll events, no IO
delivery — while `getBoundingClientRect` still reports correct layout. Measure
geometry directly, and dispatch `new Event("scroll")` by hand to exercise a
scroll handler. Do not trust screenshots from that state.

`window.__lenis` is exposed in dev only. Smooth scroll fights programmatic
`window.scrollTo`, so scroll-driven behaviour cannot be tested without
destroying the instance first. In a frozen automation tab Lenis's animated
scroll never advances, because it runs on rAF — pump it by hand with a
synchronous `for` loop calling `lenis.raf(t + i * 17)`. Do not `await` between
frames; that times out CDP and freezes the renderer for good.

**In-page `#anchor` links do not work natively anywhere on this site** — Lenis
reasserts its own target every frame and undoes the browser's jump. Route them
through `scrollToEl()` in `lib/scroll.js`.

**Do not pass a header offset to `scrollToEl`.** Lenis honours the target's
`scroll-margin-top`, and so does the `scrollIntoView` fallback, so the header
clearance is declared once in CSS next to the element. Passing an offset as
well double-counts it: `.legal-section` carries a 107px scroll-margin, and an
additional -103px offset overshot by exactly 107px.

**The hot accent (`--signal`) is for actions only** — call, submit, request.
The anatomy diagram's active part uses a cold near-white instead, deliberately,
so the hot colour keeps meaning "act" everywhere on the site.

## Form

`components/ServiceRequestForm.jsx` has three delivery paths, chosen at module
scope by `MODE`:

- **web3forms** — `VITE_WEB3FORMS_KEY` is set. Posts to Web3Forms. The only
  path that actually delivers.
- **preview** — no key, running locally. Validates fully, sends nothing, and
  says so on the confirmation screen.
- **unconfigured** — no key, in production. Renders no form at all: a panel
  points at the phone number and email instead.

There was a Netlify Forms path. It is gone — the site is on Vercel, which has
no equivalent (Netlify parsed a hidden form out of the deployed HTML and stored
submissions itself). **Without `VITE_WEB3FORMS_KEY` the site has no working
booking form**, by design, because the alternative is taking details we cannot
deliver.

**The invariant: no state tells someone "we've got it" when we have not.** A
booking form that drops requests is worse than no form.

The form carries two optional SMS opt-ins with the A2P 10DLC consent language
reproduced verbatim as registered. Both are unticked by default and neither is
validated — consent required in order to submit is not consent, and a
pre-ticked box is not an opt-in. Do not reword either one without
re-registering the campaign. Their wording is mirrored in the privacy policy's
"Phone calls, texts and email" section: change one, change the other.

There is no separate "you may contact me" checkbox; submitting the form is the
request to be contacted.
