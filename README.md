# Air Quality Masters

Marketing and booking site for Air Quality Masters — a residential and
commercial HVAC contractor in Oakland Park, Florida, serving Broward,
Miami-Dade and Palm Beach counties.

Vite + React 19 + React Router 7, plain CSS, deployed as a static site.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ — includes prerendered routes, sitemap.xml, robots.txt
```

## Before deploying

Read **[GOING-LIVE.md](./GOING-LIVE.md)**. The site is built so that unverified
business facts do not render, so the launch checklist is mostly about filling
in `src/data/company.js` — the licence number, hours, insurance and warranty
terms — and connecting the request form to a real inbox.

## Structure

```
src/
  data/          company.js, services.js, serviceAreas.js, faqs.js
                 — single source of truth; drives nav, footer, sitemap, routes
  lib/seo.js     <head> management + LocalBusiness structured data
  components/    Layout, Navigation, Footer, ServiceRequestForm, …
  pages/         Home, Services, ServiceDetail, About, ServiceAreas,
                 ServiceAreaDetail, Contact, Faq, NotFound
scripts/
  postbuild.mjs  per-route HTML metadata, sitemap.xml, robots.txt
```

Adding a service or a service-area page means adding one entry to the relevant
data file — nav, footer, sitemap and prerendered routes all follow.

See [CLAUDE.md](./CLAUDE.md) for conventions.
