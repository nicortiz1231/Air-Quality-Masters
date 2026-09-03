/**
 * Service coverage.
 *
 * VERIFY before launch: confirm this list matches where AQM actually
 * dispatches. Publishing a city the company will not drive to is the fastest
 * way to lose the trust the rest of the site is built to earn.
 *
 * `featured` cities get their own page at /service-areas/:slug. The rest are
 * listed as coverage only.
 */

export const counties = ["Broward County", "Miami-Dade County", "Palm Beach County"];

export const areas = [
  {
    slug: "oakland-park",
    name: "Oakland Park",
    county: "Broward County",
    featured: true,
    headquarters: true,
    intro:
      "Oakland Park is our home base. It is the shortest drive we make, and the area where we hold the most service history.",
    context: [
      "Much of Oakland Park's housing stock dates to the 1950s and 60s, which means a lot of original duct work running through hot, unconditioned attics and a lot of systems that were replaced without the duct system ever being re-evaluated.",
      "Properties east of Dixie Highway sit close enough to the coast that salt exposure shows up on condenser cabinets and coils years earlier than it would inland.",
    ],
  },
  {
    slug: "fort-lauderdale",
    name: "Fort Lauderdale",
    county: "Broward County",
    featured: true,
    intro:
      "Fort Lauderdale covers about as wide a range of property types as any city we work in — waterfront single-family, mid-century bungalows, downtown high-rise units and commercial along Federal and Las Olas.",
    context: [
      "On the barrier island and along the canals, salt air is the dominant factor. Coil corrosion and cabinet rust drive replacement timelines far more than run hours do.",
      "High-rise condo units bring their own constraints — building access rules, vertical drain stacks shared between units, and association requirements for licensed and insured contractors.",
    ],
  },
  {
    slug: "pompano-beach",
    name: "Pompano Beach",
    county: "Broward County",
    featured: true,
    intro:
      "Immediately north of us, and a mix of coastal residential, older inland neighbourhoods and a substantial light-industrial and commercial corridor along the tracks.",
    context: [
      "The commercial and warehouse space west of Dixie runs a lot of rooftop package equipment, much of it well past design life and worth planning around rather than replacing under emergency conditions.",
      "Coastal residential east of A1A sees the same salt-driven corrosion pattern as Fort Lauderdale beach properties.",
    ],
  },
  {
    slug: "coral-springs",
    name: "Coral Springs",
    county: "Broward County",
    featured: true,
    intro:
      "Planned residential development on a large scale, which means a lot of similar-vintage systems reaching end of life around the same time.",
    context: [
      "Much of the housing was built between the 1980s and early 2000s. A large share of that original equipment has already been replaced once, and the second replacement is coming due now.",
      "Further inland, salt exposure is much less of a factor — here the driver is run hours and humidity load rather than corrosion.",
    ],
  },
  {
    slug: "plantation",
    name: "Plantation",
    county: "Broward County",
    featured: true,
    intro:
      "Established residential with mature tree cover, plus the office and medical corridor around Broward Boulevard and University Drive.",
    context: [
      "Heavy tree cover keeps condensers shaded, which helps efficiency but also fills coils with organic debris far faster. Coil cleaning matters more here than in open developments.",
      "The commercial and medical buildings along the corridor generally need scheduled maintenance documented for compliance rather than reactive service.",
    ],
  },
  {
    slug: "hollywood",
    name: "Hollywood",
    county: "Broward County",
    featured: true,
    intro:
      "One of the older housing stocks in the county, running from the beach through the historic districts and west toward the 95 corridor.",
    context: [
      "Historic-district properties frequently have systems that were adapted into houses never designed for ducted central air, which produces persistent airflow and balance problems no amount of equipment upgrading solves on its own.",
      "Beach-side condos and rentals bring high turnover and hard use, and benefit most from maintenance on a fixed schedule.",
    ],
  },
  {
    slug: "boca-raton",
    name: "Boca Raton",
    county: "Palm Beach County",
    featured: true,
    intro:
      "The northern edge of our regular coverage — coastal residential, gated communities and a dense professional-office corridor.",
    context: [
      "Community and association rules here are strict about contractor licensing and insurance, and about scheduling work windows. Documentation is part of the job.",
      "A large share of the housing is single-storey with long duct runs through hot attics, where duct losses quietly cost more than the equipment ever will.",
    ],
  },
  {
    slug: "aventura",
    name: "Aventura",
    county: "Miami-Dade County",
    featured: true,
    intro:
      "Predominantly high-rise residential and retail, with the access and logistics that come with both.",
    context: [
      "High-rise work means vertical risers, shared condensate stacks and units where a drain problem in one apartment shows up as a ceiling stain in another.",
      "Building management generally requires proof of licensing and insurance before a technician is allowed on site, and scheduling runs through the association.",
    ],
  },

  // Additional coverage — listed, but without dedicated pages.
  { slug: "wilton-manors", name: "Wilton Manors", county: "Broward County", featured: false },
  { slug: "deerfield-beach", name: "Deerfield Beach", county: "Broward County", featured: false },
  { slug: "coconut-creek", name: "Coconut Creek", county: "Broward County", featured: false },
  { slug: "margate", name: "Margate", county: "Broward County", featured: false },
  { slug: "tamarac", name: "Tamarac", county: "Broward County", featured: false },
  { slug: "lauderhill", name: "Lauderhill", county: "Broward County", featured: false },
  { slug: "sunrise", name: "Sunrise", county: "Broward County", featured: false },
  { slug: "davie", name: "Davie", county: "Broward County", featured: false },
  { slug: "pembroke-pines", name: "Pembroke Pines", county: "Broward County", featured: false },
  { slug: "miramar", name: "Miramar", county: "Broward County", featured: false },
  { slug: "dania-beach", name: "Dania Beach", county: "Broward County", featured: false },
  { slug: "hallandale-beach", name: "Hallandale Beach", county: "Broward County", featured: false },
  { slug: "lauderdale-by-the-sea", name: "Lauderdale-By-The-Sea", county: "Broward County", featured: false },
  { slug: "sunny-isles-beach", name: "Sunny Isles Beach", county: "Miami-Dade County", featured: false },
  { slug: "north-miami-beach", name: "North Miami Beach", county: "Miami-Dade County", featured: false },
  { slug: "delray-beach", name: "Delray Beach", county: "Palm Beach County", featured: false },
];

export const featuredAreas = areas.filter((a) => a.featured);
export const getArea = (slug) => areas.find((a) => a.slug === slug);
export const areasByCounty = counties.map((county) => ({
  county,
  cities: areas.filter((a) => a.county === county),
}));
