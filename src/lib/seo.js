import { company, fullAddress } from "../data/company.js";

const SITE_NAME = company.name;
const DEFAULT_IMAGE = `${company.url}/og-image.png`;

/** Set or create a <meta> tag, keyed by name or property. */
function setMeta(key, value, attr = "name") {
  if (!value) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Applies page metadata to <head>. Called from the <Seo> component.
 */
export function applySeo({ title, description, path = "/", image = DEFAULT_IMAGE, noindex = false }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | HVAC Service in South Florida`;
  // Trailing slash on the root. scripts/postbuild.mjs bakes "https://…/" into
  // the prerendered head and the sitemap; emitting the bare origin here made
  // the hydrated canonical disagree with the one a crawler read first.
  const canonical = `${company.url}${path === "/" ? "/" : path}`;

  document.title = fullTitle;
  setMeta("description", description);
  setMeta("robots", noindex ? "noindex,nofollow" : "index,follow");
  setLink("canonical", canonical);

  setMeta("og:title", fullTitle, "property");
  setMeta("og:description", description, "property");
  setMeta("og:url", canonical, "property");
  setMeta("og:type", "website", "property");
  setMeta("og:site_name", SITE_NAME, "property");
  setMeta("og:image", image, "property");

  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", fullTitle);
  setMeta("twitter:description", description);
  setMeta("twitter:image", image);
}

/**
 * LocalBusiness / HVACBusiness structured data.
 *
 * Every optional field is omitted when the underlying fact is unverified.
 * Search engines penalise structured data that contradicts the page, and a
 * fabricated rating or licence is exactly the kind of claim this site exists
 * to avoid making.
 */
export function localBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${company.url}/#business`,
    name: company.name,
    description:
      "Residential and commercial HVAC service, repair, installation and indoor air quality work across Broward, Miami-Dade and Palm Beach counties.",
    url: company.url,
    telephone: company.phone.display,
    email: company.email,
    // streetAddress and postalCode are omitted while the address is withheld.
    // A PostalAddress carrying only locality/region is valid; inventing or
    // half-filling one is what gets structured data penalised.
    address: {
      "@type": "PostalAddress",
      ...(company.address.street && {
        streetAddress: `${company.address.street} ${company.address.suite || ""}`.trim(),
      }),
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      ...(company.address.zip && { postalCode: company.address.zip }),
      addressCountry: company.address.country,
    },
    areaServed: ["Broward County", "Miami-Dade County", "Palm Beach County"].map((n) => ({
      "@type": "AdministrativeArea",
      name: n,
    })),
  };

  if (company.address.lat && company.address.lng) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: company.address.lat,
      longitude: company.address.lng,
    };
  }

  if (company.foundedYear) schema.foundingDate = String(company.foundedYear);

  if (company.hours.weekdays) {
    schema.openingHoursSpecification = buildOpeningHours();
  }

  if (company.rating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: company.rating.score,
      reviewCount: company.rating.count,
    };
  }

  const sameAs = Object.values(company.social).filter(Boolean);
  if (sameAs.length) schema.sameAs = sameAs;

  return schema;
}

function buildOpeningHours() {
  const spec = [];
  const { weekdays, saturday, sunday } = company.hours;
  const parse = (range) => {
    if (!range || /closed/i.test(range)) return null;
    const [open, close] = range.split(/\s*[–-]\s*/);
    return { open: to24(open), close: to24(close) };
  };

  const wd = parse(weekdays);
  if (wd)
    spec.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: wd.open,
      closes: wd.close,
    });

  const sat = parse(saturday);
  if (sat)
    spec.push({ "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: sat.open, closes: sat.close });

  const sun = parse(sunday);
  if (sun)
    spec.push({ "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: sun.open, closes: sun.close });

  return spec;
}

/** "8:00 AM" -> "08:00" */
function to24(t) {
  if (!t) return null;
  const m = t.trim().match(/^(\d{1,2}):?(\d{2})?\s*(AM|PM)?$/i);
  if (!m) return t.trim();
  let h = parseInt(m[1], 10);
  const min = m[2] || "00";
  const mer = (m[3] || "").toUpperCase();
  if (mer === "PM" && h !== 12) h += 12;
  if (mer === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${min}`;
}

export { fullAddress };
