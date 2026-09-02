# Going live

The site is code-complete and builds clean. What stands between here and a
launch that earns trust is **verified business facts** — the site is built so
that anything unverified simply does not render, which means filling these in
is what makes the trust content appear.

Everything below lives in one file: `src/data/company.js`.

---

## 1. Verify the business facts — REQUIRED

Open `src/data/company.js`. Every field currently set to `null` is a fact we
could not confirm. Nothing that is `null` appears anywhere on the site.

| Field | Why it matters | Where it shows up |
| --- | --- | --- |
| `license.number` + `license.type` | The single strongest trust element on the site. Florida licences are public record. | Credential badge on Home/About/Contact, About credentials block, footer licence line, "Verify with the State of Florida" link |
| `insured` / `bonded` | Property managers and HOAs require proof before a tech is allowed on site. | Credential badge, About credentials block |
| `foundedYear` | Turns into "N years in business" automatically. | Credential badge, About |
| `hours.*` | Sets expectations and feeds `openingHoursSpecification` in structured data. | Footer, Contact page, Google rich results |
| `emergencyService` | Only set `true` if after-hours calls actually reach a technician, not an answering service. | Contact page |
| `warranty` | `{ labor: "1 year", parts: "..." }` | About credentials block |
| `reviewsUrl` + `rating` | Feeds `aggregateRating` structured data — star ratings in Google results. | About, structured data |
| `address.lat` / `address.lng` | From the Google Business Profile listing. | `geo` in structured data (local map pack) |
| `social.*` | Only add a URL once it points at a **real AQM account**. The old site linked to bare platform homepages, which reads as fake. | Structured data `sameAs` |

**Look the licence up here:** https://www.myfloridalicense.com/wl11.asp

### Two things to resolve before launch

1. **The phone number.** The old site published two: `786-307-9286` and
   `786-841-6255`. Only one is in the new site (`786-307-9286`). Confirm which
   is the real service line — two numbers on one site reads as careless, and a
   dead number is worse.
2. **The email address.** `info@aqmasters.com` is inferred, not confirmed. The
   old site hid it behind a scrape guard. Verify it receives mail.

---

## 2. Connect the request form — REQUIRED

Until this is done the form renders an honest "not connected yet" panel
pointing at the phone number. It never silently swallows a submission.

1. Sign up free at https://web3forms.com and enter the destination inbox.
2. Copy the access key.
3. `cp .env.example .env` and set `VITE_WEB3FORMS_KEY=<key>`.
4. Add the same variable in **Netlify → Site settings → Environment variables**
   (it must be present at *build* time — Vite inlines it into the bundle).
5. Submit a real test request and confirm it lands in the inbox.

The key is safe to expose in client-side code; it is tied to the destination
address, not to an account.

**Form states, all verified working:** no key → fallback panel · invalid input
→ inline field errors · network failure → error banner with the phone number ·
success → confirmation panel.

---

## 3. Replace the photography — HIGHEST VISUAL IMPACT

Every image in `public/` is **760×334**. That single letterbox aspect ratio is
the main thing holding the design back: you cannot crop a portrait, a square or
a tall editorial column out of it, so imagery can only ever appear as thin
bands. The layout now works around this by using each photo small (thumbnails,
plate figures, the process panel) where 760px reads sharp — but with real
assets the same layouts get substantially better.

**Both Unsplash and Pexels block automated download (401/403), and CC0 HVAC
imagery is thin and visually incoherent** — so this is a 10-minute manual job
that produces far better results than anything scriptable.

### What to get

Go to [unsplash.com](https://unsplash.com) or [pexels.com](https://pexels.com)
— both are free for commercial use with no attribution required. Download the
**largest size offered**, and save with these exact filenames into `public/`
so no code changes are needed:

| Filename | Search terms | Aspect wanted | Used by |
| --- | --- | --- | --- |
| `residential-condensers.jpg` | "air conditioner unit house", "hvac condenser outdoor" | Wide 16:9+ | Home hero (biggest impact), AC repair page, process step 01 |
| `commercial-rooftop.jpg` | "rooftop hvac", "commercial air conditioning roof" | Wide 16:9+ | Services band, commercial page, process step 04 |
| `coil-copper-detail.jpg` | "copper pipe hvac", "refrigeration coil close up" | Square or 4:3 | Plate figure 01, maintenance page, process step 02 |
| `mechanical-room.jpg` | "air handler unit", "hvac mechanical room" | 4:3 or portrait | Plate figure 02, installation page, process step 03 |
| `architectural-vents.jpg` | "ceiling air vent", "ventilation grille architecture" | 4:3 | Plate figure 03, duct cleaning page, process step 05 |
| `airflow-detail.jpg` | "air vent macro", "ventilation detail" | Wide | Process section background |

Two more worth adding if you find good ones — say the word and I will build
sections that use them:

| Filename | Search terms | Would enable |
| --- | --- | --- |
| `technician-gauges.jpg` | "hvac manifold gauges", "technician tools hands" | A "diagnosis first" proof section — hands and instruments, no faces |
| `duct-attic.jpg` | "flexible duct attic", "ductwork insulation" | Illustrating the attic duct-loss story the copy already tells |

**Selection guidance.** Pick images that share a look — cool/neutral colour
grading, similar contrast. Visual cohesion matters more than any individual
photo. Avoid anything with a visible face or a posed "friendly technician"; the
whole point of this rebuild is to not look like a template, and stock people
are the fastest way back to one.

**Real AQM photos beat all of this.** Job sites, branded vehicles, actual
installs, the crew's hands at work — even phone photos. That is the single
strongest signal that this is a real business.

## 4. Confirm the service areas — REQUIRED

`src/data/serviceAreas.js` lists 24 cities across three counties. Eight have
their own page. **Confirm AQM actually dispatches to all of them.** Publishing
a city the company will not drive to costs you the trust the rest of the site
is built to earn — and generates wasted calls.

Removing a city from that file removes it from the nav, the footer, the
coverage lists, the sitemap and the prerendered routes automatically.

---

## 5. Deploy to Netlify

```bash
npm run build        # vite build + prerender + sitemap + robots
```

`netlify.toml` is already configured (build command, publish dir, SPA
redirect, security headers, asset caching).

1. Push the repo to GitHub.
2. Netlify → **Add new site → Import an existing project** → pick the repo.
3. Build settings are read from `netlify.toml` — no manual entry needed.
4. Add `VITE_WEB3FORMS_KEY` under Environment variables **before** the first
   build.
5. Deploy, then check the deploy preview URL.

### DNS cutover

Point `aqmasters.com` at Netlify once the preview looks right. Netlify issues
the SSL certificate automatically. Keep the old site up until DNS has
propagated and the new one is confirmed working.

---

## 6. After launch

- **Google Search Console** — verify the domain, submit
  `https://aqmasters.com/sitemap.xml`.
- **Google Business Profile** — make sure the name, address and phone match
  `company.js` *exactly*. Inconsistent NAP data is the most common reason a
  local business ranks poorly in the map pack.
- **Test the structured data** — https://search.google.com/test/rich-results
  against the live URL. It should find `HVACBusiness` on every page, `Service`
  on service and area pages, and `FAQPage` on `/faq`.
- **Redirects from the old site.** The old URLs (`/contact-us`, `/about`,
  `/services`, `/estimates`, `/locations`) should 301 to their new equivalents
  so existing links and search rankings carry over. Add them to `netlify.toml`
  once you know the exact old paths.

---

## What was deliberately left out

These were on the old site and are **not** on the new one, on purpose:

- **The four team members** — placeholder names on stock photos.
- **The statistics** — "15,000+ projects", "150+ certified specialists",
  "14,000+ satisfied clients", "86,000+ service locations", and a
  "75% commercial / 85% residential" split that does not add up. None were
  supportable, and unverifiable numbers actively damage trust.
- **"25+ years of experience"** — no evidence found. It comes back
  automatically the moment `foundedYear` is set to a real value.
- **Blog posts** — two undated 2023 posts with no author. A stale blog is worse
  than no blog. Worth doing properly later.
