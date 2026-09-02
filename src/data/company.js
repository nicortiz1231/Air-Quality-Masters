/**
 * Single source of truth for every factual claim the site makes.
 *
 * RULE: anything set to `null` is NOT rendered anywhere on the site.
 * That is deliberate. A trust-focused site must never publish a claim the
 * business cannot back up, so unverified facts are absent rather than guessed.
 * Fill a value in and the corresponding UI appears automatically.
 *
 * See GOING-LIVE.md for the checklist of what still needs verification.
 */

export const company = {
  name: "Air Quality Masters",
  shortName: "AQM",
  tagline: "Comfort Engineered, Reliability Delivered",

  // --- Contact -------------------------------------------------------------
  // VERIFY: the old site published two different numbers (786-307-9286 and
  // 786-841-6255). Only one should be the public service line.
  phone: {
    display: "786-307-9286",
    href: "tel:+17863079286",
  },
  email: "info@aqmasters.com", // VERIFY: old site obfuscated this behind a mailto scrape guard.

  address: {
    street: "3405 NW 44th St",
    suite: "Suite #106",
    city: "Oakland Park",
    state: "FL",
    zip: "33309",
    country: "US",
    // VERIFY: pull exact coordinates from the Google Business Profile listing.
    lat: null,
    lng: null,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=3405+NW+44th+St+Suite+106+Oakland+Park+FL+33309",
  },

  // --- Credentials ---------------------------------------------------------
  // These are the highest-value trust elements on the site. Each renders a
  // visible badge only once filled in.
  // VERIFY: look the license up at https://www.myfloridalicense.com/wl11.asp
  license: {
    number: null, // e.g. "CAC1234567"
    type: null, // e.g. "Florida State Certified Air Conditioning Contractor"
    verifyUrl: "https://www.myfloridalicense.com/wl11.asp",
  },
  insured: null, // VERIFY: set to true only with a current certificate of insurance on file.
  bonded: null, // VERIFY: same.

  // VERIFY: the founding year. The old site implied 25+ years but published
  // nothing to support it, so it stays out until confirmed.
  foundedYear: null,

  // --- Operations ----------------------------------------------------------
  // VERIFY: confirm real office hours and whether after-hours dispatch is
  // genuinely staffed 24/7 or is an answering service.
  hours: {
    weekdays: null, // e.g. "8:00 AM – 6:00 PM"
    saturday: null, // e.g. "9:00 AM – 3:00 PM"
    sunday: null, // e.g. "Closed"
  },
  emergencyService: null, // VERIFY: true only if after-hours calls reach a technician.

  // VERIFY: parts/labour warranty actually offered.
  warranty: null, // e.g. { labor: "1 year", parts: "Manufacturer warranty honored" }

  // --- Reputation ----------------------------------------------------------
  // VERIFY: paste the Google Business Profile review link. Reviews render only
  // when this is present, and only real quotes belong in reviews.js.
  reviewsUrl: null,
  rating: null, // e.g. { score: 4.8, count: 127, source: "Google" }

  // --- Social --------------------------------------------------------------
  // VERIFY: the old site linked to bare platform homepages, not real profiles.
  // Only add a URL here once it points at an actual AQM account.
  social: {
    facebook: null,
    instagram: null,
    linkedin: null,
    x: null,
  },

  // --- Site ----------------------------------------------------------------
  url: "https://aqmasters.com",
  serviceType: "HVAC Contractor",
};

/** Full one-line address, e.g. for schema and footers. */
export const fullAddress = [
  company.address.street,
  company.address.suite,
  `${company.address.city}, ${company.address.state} ${company.address.zip}`,
]
  .filter(Boolean)
  .join(", ");

/** Years in business, or null while foundedYear is unverified. */
export const yearsInBusiness = company.foundedYear
  ? new Date().getFullYear() - company.foundedYear
  : null;
