/**
 * Service catalogue. Each entry backs both a row on /services and its own
 * detail page at /services/:slug.
 *
 * Copy is written for South Florida specifically — year-round cooling load,
 * salt-air corrosion, humidity-driven drain and mold problems — because
 * generic HVAC copy is exactly what makes a site read as a template.
 */

export const services = [
  {
    slug: "ac-repair",
    short: "Warm air, constant running, water where it shouldn't be — or nothing at all.",
    number: "01",
    title: "Residential AC Repair",
    shortTitle: "AC Repair",
    summary:
      "Diagnosis and repair for home cooling systems that are running warm, running constantly, leaking or not running at all.",
    tags: ["Diagnostics", "Repair", "Emergency Service"],
    image: "/residential-condensers.jpg",
    imageAlt:
      "Residential condenser units installed outside a South Florida home",

    intro:
      "In South Florida a cooling system runs most of the year, which means components wear on a schedule closer to a commercial building than a home in a four-season climate. When something fails, the priority is finding the actual cause before anything gets replaced.",

    symptoms: {
      heading: "Common reasons people call",
      items: [
        "Air coming from the vents is warm, or noticeably weaker than it used to be",
        "The system runs constantly and never reaches the thermostat setting",
        "Water around the air handler, or a ceiling stain below it",
        "The unit shuts off after a few minutes and restarts — short cycling",
        "Ice on the refrigerant line or the indoor coil",
        "Grinding, screeching or rattling that started recently",
        "A breaker that trips whenever the system starts",
      ],
    },

    work: {
      heading: "What the visit covers",
      items: [
        [
          "Full system diagnosis",
          "Refrigerant pressures, electrical draw, airflow and temperature split are measured — not estimated — so the fault is identified rather than guessed at.",
        ],
        [
          "Condensate and drainage check",
          "Clogged drain lines are the single most common cause of AC shutdowns in a humid climate. The line, pan and safety switch get checked on every call.",
        ],
        [
          "Electrical and control inspection",
          "Capacitors, contactors, relays and thermostat wiring are the usual failure points and the usual cause of a system that won't start.",
        ],
        [
          "Written findings and options",
          "You get the cause, the recommended fix, and — when a repair is close to the cost of replacement — an honest comparison instead of a one-sided quote.",
        ],
      ],
    },
  },

  {
    slug: "commercial-hvac",
    short: "Rooftop units, split systems and multi-zone equipment, scheduled around your operation.",
    number: "02",
    title: "Commercial HVAC",
    shortTitle: "Commercial",
    summary:
      "Service, maintenance and replacement for rooftop units, split systems and multi-zone equipment in offices, retail and light industrial properties.",
    tags: ["Rooftop Units", "Scheduled Maintenance", "Multi-Zone"],
    image: "/commercial-rooftop.jpg",
    imageAlt: "Commercial rooftop HVAC package units at dusk",

    intro:
      "For a commercial property, an HVAC failure is a business interruption. Retail loses foot traffic, restaurants lose product, offices lose a working day. The job is to keep equipment ahead of failure and to respond quickly when something does go down.",

    symptoms: {
      heading: "Where we typically get involved",
      items: [
        "Rooftop package units that are past design life and failing more often each season",
        "Uneven temperatures between zones, or tenant complaints in a specific area",
        "Energy costs climbing without a matching change in occupancy",
        "Property managers who need documented, scheduled maintenance across several sites",
        "A system that needs to stay running while it is being replaced in phases",
      ],
    },

    work: {
      heading: "How commercial work is handled",
      items: [
        [
          "Scheduled around your operation",
          "Service is planned for off-hours or low-traffic periods wherever the work allows it, so the repair is not a second disruption.",
        ],
        [
          "Documented service history",
          "Every visit produces a record of what was found and what was done — useful for budgeting, for tenant communication and for warranty claims.",
        ],
        [
          "Equipment-level reporting",
          "Multi-unit properties get findings organised by unit, so you can see which equipment is stable and which is approaching replacement.",
        ],
        [
          "Planned replacement, not emergency replacement",
          "Where a unit is nearing end of life, you get the timeline in advance so the capital expense can be scheduled instead of forced.",
        ],
      ],
    },
  },

  {
    slug: "duct-cleaning",
    short: "Airflow, leaks, and the moisture problems this humidity causes in attic duct work.",
    number: "03",
    title: "Air Duct Cleaning & Ventilation",
    shortTitle: "Ducts & Ventilation",
    summary:
      "Duct inspection, cleaning and ventilation repair to restore airflow and address the moisture problems specific to a humid climate.",
    tags: ["Duct Inspection", "Cleaning", "Airflow"],
    image: "/architectural-vents.jpg",
    imageAlt: "Architectural ceiling ventilation grilles",

    intro:
      "Duct work is where a lot of South Florida comfort problems actually live. Humidity, attic heat and decades-old flexible duct combine to produce leaks, crushed runs and microbial growth — none of which a new condenser will fix.",

    symptoms: {
      heading: "Signs the duct work is the problem",
      items: [
        "One room never cools the way the rest of the house does",
        "Visible dust discharge from the supply vents shortly after cleaning",
        "A musty smell that appears when the system starts a cycle",
        "Allergy or respiratory symptoms that are noticeably worse indoors",
        "Ducts in an unconditioned attic that have never been inspected",
        "A recent renovation, roof repair or rodent problem in the attic",
      ],
    },

    work: {
      heading: "What the service includes",
      items: [
        [
          "Inspection before cleaning",
          "The system is inspected first. If cleaning is not what the duct work needs — if the real issue is a disconnected run or crushed flex — you are told that instead of sold a cleaning.",
        ],
        [
          "Supply and return cleaning",
          "Registers, trunk lines and branch runs are cleaned, along with the blower compartment where debris actually accumulates.",
        ],
        [
          "Leak and connection repair",
          "Disconnected boots and separated joints are re-sealed. A duct system leaking into an attic is cooling the attic at your expense.",
        ],
        [
          "Ventilation and pressure balance",
          "Return air capacity is checked against the equipment. Undersized returns are a common cause of poor airflow that cleaning alone will not solve.",
        ],
      ],
    },
  },

  {
    slug: "installation",
    short: "Right-sized replacement, sized by load calculation and verified under load.",
    number: "04",
    title: "AC Installation & Replacement",
    shortTitle: "Installation",
    summary:
      "Right-sized system replacement and new installation — equipment selection, load calculation, removal of the old system and full commissioning.",
    tags: ["Replacement", "Load Calculation", "Commissioning"],
    image: "/mechanical-room.jpg",
    imageAlt: "Mechanical room with air handling equipment",

    intro:
      "A replacement is the largest HVAC decision most property owners make, and the most common way it goes wrong is sizing. An oversized system cools quickly, shuts off, and never runs long enough to pull humidity out of the air — which in this climate leaves a house cold and clammy.",

    symptoms: {
      heading: "When replacement is the right call",
      items: [
        "The system uses R-22 refrigerant, which is no longer produced and expensive to source",
        "Repair cost is approaching a meaningful share of replacement cost",
        "The equipment is past roughly 10–15 years and failing repeatedly",
        "The house is cold but humid — a classic symptom of an oversized system",
        "Coastal corrosion has reached the coil or cabinet",
        "You are planning an addition or a change that alters the cooling load",
      ],
    },

    work: {
      heading: "How an installation is done properly",
      items: [
        [
          "Load calculation, not a rule of thumb",
          "Equipment is sized to the actual building — square footage, insulation, window exposure, ceiling height — rather than matched to whatever was there before.",
        ],
        [
          "Honest equipment options",
          "You see the efficiency tiers with the real cost difference and the realistic payback, so the decision is yours to make on the numbers.",
        ],
        [
          "Correct removal and disposal",
          "The old system is recovered and disposed of to code, including refrigerant recovery.",
        ],
        [
          "Commissioning and verification",
          "Charge, airflow, temperature split and drainage are all verified under load before the job is closed, and the results are documented.",
        ],
      ],
    },
  },

  {
    slug: "maintenance",
    short: "Catch the failures on a planned visit instead of on the hottest day of the year.",
    number: "05",
    title: "Preventative Maintenance",
    shortTitle: "Maintenance",
    summary:
      "Scheduled tune-ups that keep a system running through the season it is needed most, and catch small failures before they become outages.",
    tags: ["Tune-Ups", "Seasonal Service", "Drain Care"],
    image: "/coil-copper-detail.jpg",
    imageAlt: "Close detail of copper refrigerant coil tubing",

    intro:
      "Most emergency AC calls in South Florida are preventable, and a large share of them trace back to a clogged condensate drain or a capacitor that had been reading low for months. Maintenance is simply catching those on a schedule instead of on the hottest day of the year.",

    symptoms: {
      heading: "Why it matters in this climate",
      items: [
        "Systems here run close to year-round, so wear accumulates faster than manufacturer averages assume",
        "Humidity means condensate drains clog — the leading cause of mid-season shutdowns",
        "Salt air accelerates coil and cabinet corrosion on coastal properties",
        "Most manufacturer warranties require documented annual maintenance to stay valid",
        "A dirty coil raises energy use long before it causes a visible failure",
      ],
    },

    work: {
      heading: "What a maintenance visit covers",
      items: [
        [
          "Coil cleaning and airflow check",
          "Condenser and evaporator coils are cleaned and airflow is measured, because a restricted system works harder for less cooling.",
        ],
        [
          "Drain line clearing and treatment",
          "The condensate line is cleared and the safety switch tested — the single highest-value item on the list in a humid climate.",
        ],
        [
          "Electrical component testing",
          "Capacitors and contactors are tested against spec, so a part reading low gets replaced on a planned visit rather than failing later.",
        ],
        [
          "Refrigerant and performance readings",
          "Pressures and temperature split are recorded, which makes a slow refrigerant leak visible over time instead of only at failure.",
        ],
      ],
    },
  },

  {
    slug: "indoor-air-quality",
    short: "For when the air itself is the problem, not the temperature.",
    number: "06",
    title: "Indoor Air Quality",
    shortTitle: "Air Quality",
    summary:
      "Filtration, humidity control and ventilation improvements for properties where the air itself — not the temperature — is the problem.",
    tags: ["Filtration", "Humidity Control", "Ventilation"],
    image: "/airflow-detail.jpg",
    imageAlt: "Detail of airflow through a ventilation assembly",

    intro:
      "Cooling and air quality are related but not the same thing. A system can hold temperature perfectly and still leave a property humid, dusty or stale — and in a climate this humid, controlling moisture is usually where the real improvement comes from.",

    symptoms: {
      heading: "Problems this addresses",
      items: [
        "The house holds temperature but still feels damp or sticky",
        "Humidity readings sitting above roughly 60% indoors",
        "Persistent dust, or surfaces that need wiping days after cleaning",
        "Odours that linger between rooms",
        "Allergy or asthma symptoms concentrated indoors",
        "Condensation on vents, windows or interior walls",
      ],
    },

    work: {
      heading: "What we can change",
      items: [
        [
          "Filtration matched to the system",
          "A higher-MERV filter helps only if the equipment can move air through it. Filtration is selected against the system's actual static pressure, not sold by rating alone.",
        ],
        [
          "Humidity control",
          "Where run-time alone cannot hold humidity down, dedicated dehumidification is the fix — and it is often the difference between comfortable and merely cold.",
        ],
        [
          "Ventilation assessment",
          "Fresh-air intake and exhaust are checked, particularly in tighter newer construction where stale air accumulates.",
        ],
        [
          "Source identification",
          "Where the cause is duct contamination, a moisture intrusion or a failing component, that gets identified — equipment added on top of an unsolved source is wasted money.",
        ],
      ],
    },
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);
