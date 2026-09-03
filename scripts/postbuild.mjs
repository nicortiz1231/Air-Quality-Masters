/**
 * Post-build: sitemap, robots, and per-route HTML.
 *
 * The app is a client-rendered SPA, so every route would otherwise ship the
 * same <head>. Crawlers and link unfurlers read the head before running any
 * JavaScript, which would give every page the home page's title and card.
 *
 * This writes one real HTML file per route with that route's title,
 * description and canonical baked in. React still hydrates and takes over
 * routing — the file only fixes what a crawler sees first.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const { company } = await import("../src/data/company.js");
const { services } = await import("../src/data/services.js");
const { areas, featuredAreas } = await import("../src/data/serviceAreas.js");
const { legalDocuments } = await import("../src/data/legal.js");
const { FIELDS, FORM_NAME, HONEYPOT } = await import("../src/data/requestForm.js");

const SITE = company.url.replace(/\/$/, "");

const routes = [
  { path: "/", priority: "1.0", changefreq: "weekly",
    title: "Air Quality Masters | AC Repair & HVAC Service in South Florida",
    description: "Residential and commercial AC repair, installation, duct cleaning and indoor air quality across Broward, Miami-Dade and Palm Beach counties. Diagnosis first, pricing before the work." },
  { path: "/services", priority: "0.9", changefreq: "monthly",
    title: "HVAC Services | Air Quality Masters",
    description: "AC repair, commercial HVAC, duct cleaning, installation, preventative maintenance and indoor air quality for South Florida homes and businesses." },
  { path: "/about", priority: "0.8", changefreq: "monthly",
    title: "About | Air Quality Masters",
    description: `Air Quality Masters is an HVAC contractor based in ${company.address.city}, Florida, serving residential and commercial properties across South Florida.` },
  { path: "/service-areas", priority: "0.8", changefreq: "monthly",
    title: "Service Areas | Air Quality Masters",
    description: "HVAC and AC repair across Broward, Miami-Dade and Palm Beach counties — Fort Lauderdale, Oakland Park, Pompano Beach, Coral Springs, Hollywood and Boca Raton." },
  { path: "/contact", priority: "0.9", changefreq: "monthly",
    title: "Request Service | Air Quality Masters",
    description: `Book HVAC service with Air Quality Masters. Call ${company.phone.display} or send a request online — residential and commercial, across South Florida.` },
  { path: "/faq", priority: "0.7", changefreq: "monthly",
    title: "Frequently Asked Questions | Air Quality Masters",
    description: "Straight answers on diagnostic fees, repair versus replacement, R-22 refrigerant, humidity problems, duct cleaning and how our service calls work." },

  ...services.map((s) => ({
    path: `/services/${s.slug}`, priority: "0.8", changefreq: "monthly",
    title: `${s.title} | Air Quality Masters`,
    description: s.summary,
  })),

  ...legalDocuments.map((d) => ({
    path: d.path, priority: "0.3", changefreq: "yearly",
    title: `${d.title} | Air Quality Masters`,
    description: d.description,
  })),

  { path: "/sitemap", priority: "0.3", changefreq: "monthly",
    title: "Sitemap | Air Quality Masters",
    description: "Every page on the Air Quality Masters site — services, service areas, company information and policies." },

  ...featuredAreas.map((a) => ({
    path: `/service-areas/${a.slug}`, priority: "0.7", changefreq: "monthly",
    title: `AC Repair & HVAC Service in ${a.name}, FL | Air Quality Masters`,
    description: `Residential and commercial HVAC service in ${a.name}, ${a.county} — AC repair, installation, duct cleaning and maintenance from Air Quality Masters.`,
  })),
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// ── Netlify Forms detection ────────────────────────────────────
// Netlify discovers forms by parsing the deployed HTML at build time, and only
// stores the fields it finds there. A React form alone is invisible to it — the
// markup never exists as a file — so without this the booking form would post
// to a form Netlify has never heard of and the request would vanish.
//
// The field list comes from src/data/requestForm.js, the same module the React
// form reads, so the two cannot drift apart. Adding a field there is the only
// edit needed.
const detectionForm =
  `<form name="${FORM_NAME}" data-netlify="true" data-netlify-honeypot="${HONEYPOT}" hidden>` +
  `<input type="hidden" name="form-name" value="${FORM_NAME}" />` +
  `<input type="text" name="${HONEYPOT}" />` +
  FIELDS.map((f) => `<input type="text" name="${f}" />`).join("") +
  `</form>`;

// ── Per-route HTML ─────────────────────────────────────────────
let shell = await readFile(join(dist, "index.html"), "utf8");

if (!shell.includes("<body>")) throw new Error("postbuild: no <body> in the built shell");
shell = shell.replace("<body>", `<body>\n    ${detectionForm}`);

for (const route of routes) {
  const canonical = `${SITE}${route.path === "/" ? "/" : route.path}`;
  let html = shell
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[\s\S]*?(")/, `$1${esc(route.description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`)
    .replace(/(<meta property="og:title" content=")[\s\S]*?(")/, `$1${esc(route.title)}$2`)
    .replace(/(<meta property="og:description" content=")[\s\S]*?(")/, `$1${esc(route.description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`);

  if (route.path === "/") {
    await writeFile(join(dist, "index.html"), html);
  } else {
    const dir = join(dist, route.path);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, "index.html"), html);
  }
}

// ── sitemap.xml ────────────────────────────────────────────────
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE}${r.path === "/" ? "/" : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
await writeFile(join(dist, "sitemap.xml"), sitemap);

// ── robots.txt ─────────────────────────────────────────────────
await writeFile(
  join(dist, "robots.txt"),
  `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`
);

const unlisted = areas.filter((a) => !a.featured).length;
console.log(
  `postbuild: ${routes.length} routes prerendered, sitemap + robots written ` +
  `(${unlisted} additional service areas listed without dedicated pages)`
);
console.log(
  `postbuild: Netlify form "${FORM_NAME}" declared with ${FIELDS.length} fields ` +
  `(${FIELDS.join(", ")})`
);

// A booking form is the only thing on this site that has to work. Say out loud
// which delivery path the build produced, so a missing key is noticed at deploy
// time rather than by a customer who never gets a call back.
if (process.env.VITE_WEB3FORMS_KEY) {
  console.log("postbuild: delivery = Web3Forms (VITE_WEB3FORMS_KEY is set)");
} else {
  console.log(
    "postbuild: delivery = Netlify Forms (no VITE_WEB3FORMS_KEY).\n" +
    "           Submissions land in the Netlify dashboard. Add a notification\n" +
    "           email under Forms → Settings, or the office will not be told."
  );
}
