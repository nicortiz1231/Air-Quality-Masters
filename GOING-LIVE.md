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

### Settled

- **The phone number.** Confirmed as `786-841-6255` — the number the old home
  page published. `786-307-9286` has been removed from the site entirely.
- **The legal entity.** `Air Quality Masters, LLC` — taken from the company's
  own published Terms and Conditions. It appears in the footer copyright and
  in the policy pages, and nowhere in marketing copy.
- **The email address.** `info@mail.aqmasters.com`, confirmed routable —
  `mail.aqmasters.com` carries MX records to Mailgun. **The apex
  `aqmasters.com` has no MX at all**, so `info@aqmasters.com` bounces; it was
  on the site and has been removed. Do not put an apex address back without
  adding MX records first.

### Still to resolve

1. **Confirm mail is actually delivered, not just routed.** The MX records for
   `mail.aqmasters.com` point at Mailgun, which proves mail is *accepted* —
   it does not prove a Mailgun route forwards it to somewhere a person reads.
   Send a test message to `info@mail.aqmasters.com` from an outside address
   and confirm it arrives.
2. **The data retention period.** `company.dataRetentionYears` is set to `3`
   and the privacy policy states it as a promise. Confirm the office actually
   keeps service records that long, and change the number if not. A retention
   period the business does not honour is worse than none.

---

## 2. Connect the request form — REQUIRED

The form delivers through **Web3Forms**, and `VITE_WEB3FORMS_KEY` is the only
thing that makes it work. There is no host-provided fallback: the site is on
Vercel, which has no equivalent of Netlify Forms.

| Where | Path | What is needed |
| --- | --- | --- |
| Anywhere, key set | **Web3Forms** | `VITE_WEB3FORMS_KEY` at build time. |
| Production, no key | **Unconfigured** | No form renders at all — a panel points at the phone and email. Deliberate. |
| `npm run dev` / localhost | **Preview** | Nothing. Validates fully, delivers nothing, and says so on the confirmation screen. |

Every build prints which path it produced. Read that line on the deploy log.

### Setting it up

1. Sign up free at https://web3forms.com and enter the destination inbox —
   **info@mail.aqmasters.com**. The key is emailed to that address, which is
   how the inbox is verified.
2. Copy the access key.
3. `cp .env.example .env` and set `VITE_WEB3FORMS_KEY=<key>` for local work.
4. Add the same variable in **Vercel → Project → Settings → Environment
   Variables** — it must be present at *build* time, because Vite inlines it
   into the bundle. **Redeploy after adding it**; changing the variable without
   a rebuild leaves the old key live in the deployed JS.
5. Submit a real test request and confirm it lands in the inbox.

### Changing where requests are delivered

**The key IS the destination.** Web3Forms binds the recipient to the access key
and offers no per-submission recipient override — there is no `to` field, and
`replyto` only sets who a reply goes back to (the customer). Nothing in `src/`
can move a submission to a different inbox.

So to redirect requests, issue a **new key** against the new address and
replace the value in both `.env` and Vercel, then redeploy. Verify with a real
test submission before trusting it; a stale key fails silently from the
office's point of view, because the sender still sees the success screen.

The key is safe to expose in client-side code; it is tied to the destination
address, not to an account.

### What the form collects

Name, phone, email, **street address**, city, property type, service, urgency,
preferred contact method, description, and an explicit consent checkbox. The
street address is required — a technician cannot be dispatched to a city.

The consent checkbox is not decoration. It is the record that the customer
agreed to be contacted by phone, text or email, which is what the TCPA asks
for and what an ad platform will ask to see. Its wording matches the "Phone
calls, texts and email" section of the privacy policy; change one and change
the other.

### Adding a field later

Add the name to `FIELDS` in `src/data/requestForm.js` and add the input to
`ServiceRequestForm.jsx`. Nothing else. postbuild regenerates the Netlify
detection form from the same list, which is what stops a new field from being
accepted by the browser and then silently dropped by Netlify.

**Form states, all verified in a browser:** empty submit → six inline field
errors, focus moved to the first bad field · short phone / malformed email →
specific messages · "No cooling right now" → escalation panel with the phone
number · valid submit → confirmation panel, wording adapts to urgency · local
preview → confirmation plus an explicit "nothing was sent" note · network
failure → error banner with the phone number.

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
- **Redirects from the old site — already configured.** The live old paths
  were probed and mapped in `netlify.toml`: `/home682032` → `/`, `/about-us`
  and `/team` → `/about`, `/contact-us` and `/estimates` → `/contact`,
  `/locations` → `/service-areas`, `/privacy-policy`, `/terms-conditions` and
  `/terms-and-conditions` → `/terms`. Spot-check a few after cutover.
- **Check the 404 actually 404s.** `netlify.toml` serves the app shell with a
  **404 status** for unmatched paths, not the usual 200 — a soft 404 gets the
  nonexistent URL indexed. `curl -I https://aqmasters.com/nope` should say
  `HTTP/2 404`. If a real page ever returns 404, it is missing from the route
  list in `scripts/postbuild.mjs`.
- **Check the Content-Security-Policy did not break anything.** `netlify.toml`
  ships a CSP scoped to Google Fonts and Web3Forms. Load the deployed site with
  the console open; a blocked resource is silent in the UI but loud in the
  console. If you add any third party — analytics, a chat widget, a review
  embed — it must be added to the policy or it will not load.

---

## 7. Have the policies reviewed — REQUIRED before relying on them

Three documents now exist, all driven from `src/data/legal.js` and linked in
the footer of every page:

| Page | Source |
| --- | --- |
| `/terms` | The company's own published Terms and Conditions, last revised 2 July 2025, reproduced faithfully. |
| `/privacy` | **Written from scratch.** See below. |
| `/accessibility` | Written from what the code actually does. |

**The old site had no privacy policy.** `aqmasters.com/privacy-policy` and
`aqmasters.com/terms-conditions` serve the byte-identical Terms and Conditions
document — the privacy link has been pointing at the wrong page for as long as
it has existed. That is why the old `/privacy-policy` URL redirects to `/terms`
and not to `/privacy`: anyone following an old link lands on the document they
actually read.

The new privacy policy describes what this site genuinely does — no cookies, no
analytics, no advertising trackers, two third parties (Google Fonts and the
form relay). It is accurate as written. Two caveats:

1. **None of this is legal advice, and no attorney has reviewed it.** Have one
   read all three before launch.
2. **It stops being accurate the moment anything is added.** Adding Google
   Analytics, a Meta pixel, a chat widget or a review embed makes the "no
   cookies, no tracking" section false, and a cookie banner becomes necessary.
   If you add tracking, update `/privacy` in the same commit.

Two changes were made to the terms, both deliberate: the closing "contact us"
pointer referenced a URL serving the wrong document, and a scope section was
added stating that these terms cover the **website** and that HVAC work is
governed by the signed work order. Without that, the "as is, no warranties"
clause reads as disclaiming warranties on the actual work.

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
