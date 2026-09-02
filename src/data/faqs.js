/**
 * FAQ content. Also feeds FAQPage structured data on /faq.
 *
 * Answers that would depend on unverified business facts (pricing, warranty
 * terms, exact hours) are written to be true regardless, and the pages that
 * need those specifics pull them from company.js so they stay in one place.
 */

export const faqCategories = [
  {
    category: "Service calls",
    items: [
      {
        q: "How quickly can someone come out?",
        a: "Call the office and you will get a real answer about the day's schedule rather than a placeholder window. No-cooling calls are prioritised over routine work, because in this climate a failed system is not a minor inconvenience.",
      },
      {
        q: "Do you charge a diagnostic fee?",
        a: "Yes. A proper diagnosis takes measurement — refrigerant pressures, electrical draw, airflow and temperature split — and that time is charged for. You are told the amount before a technician is dispatched, never after the work is done. If you proceed with the repair, ask about how the fee is applied.",
      },
      {
        q: "Will you tell me the price before you start the work?",
        a: "Always. Diagnosis comes first, then you get the cause, the recommended repair and the cost, and you decide. Work does not begin on an open-ended basis.",
      },
      {
        q: "What should I check before calling?",
        a: "Three things solve a surprising number of calls: confirm the thermostat is set to cool and the batteries are good, check that the breaker has not tripped, and look at whether the air filter is clogged. If the system is frozen, switching to fan-only for a few hours lets the ice clear and often reveals what is actually wrong.",
      },
    ],
  },
  {
    category: "Repairs and equipment",
    items: [
      {
        q: "How do I know whether to repair or replace?",
        a: "The honest test is age against cost. A system under about ten years old with a single failed component is usually worth repairing. Past twelve to fifteen years, with a major component failing and R-22 refrigerant in the system, replacement is generally the better use of the money. You should get both numbers and the reasoning, not a one-sided recommendation.",
      },
      {
        q: "My system still uses R-22. Does that matter?",
        a: "It does. R-22 has not been produced or imported in the United States since 2020, so it is only available as reclaimed stock and the price reflects that. A leak on an R-22 system can cost more to recharge than the repair itself is worth, which is why age plus R-22 usually points toward replacement.",
      },
      {
        q: "Why is my house cold but still humid?",
        a: "Almost always an oversized system. It cools the air to the setpoint fast, shuts off, and never runs long enough to pull moisture out. It is one of the most common problems in South Florida and it is caused at installation, by sizing equipment on a rule of thumb instead of a load calculation.",
      },
      {
        q: "Why does my AC keep shutting off on its own?",
        a: "In this climate, the first suspect is the condensate drain. When the line clogs, the safety switch cuts the system off deliberately to stop water damage. Clearing the line fixes it, and keeping it clear is why maintenance is worth scheduling.",
      },
    ],
  },
  {
    category: "Maintenance and air quality",
    items: [
      {
        q: "How often should a system be serviced?",
        a: "Twice a year is the standard recommendation, and in South Florida it is genuinely justified — systems here run close to year-round, so wear accumulates faster than the manufacturer averages assume. At minimum, service it once before the heaviest part of cooling season.",
      },
      {
        q: "Do I actually need my ducts cleaned?",
        a: "Not automatically, and anyone who tells you otherwise without looking is selling rather than advising. Cleaning is worth it when there is visible contamination, after a renovation or rodent problem, or where there is a musty smell on start-up. Often the real issue is a disconnected or crushed duct run, which cleaning will not fix.",
      },
      {
        q: "What filter should I use?",
        a: "The highest rating your system can actually move air through. A dense filter on equipment that was not designed for it restricts airflow, which reduces cooling and can freeze the coil. The right answer depends on the static pressure your specific system is running.",
      },
    ],
  },
  {
    category: "Working with us",
    items: [
      {
        q: "Are you licensed and insured?",
        a: "Yes, and you should never take that on faith from any contractor. Florida licences are public record and searchable at myfloridalicense.com — look ours up, and look up anyone else you are considering.",
      },
      {
        q: "Do you work on commercial properties?",
        a: "Yes. Roughly speaking, commercial work is scheduled around your operation rather than ours, and produces documented service records per unit — useful for budgeting, tenant communication and warranty claims across multi-unit properties.",
      },
      {
        q: "What areas do you cover?",
        a: "Broward County primarily, extending into southern Palm Beach County and northern Miami-Dade. If you are outside that and not sure, call and ask — a straight answer costs you nothing and saves a wasted appointment.",
      },
    ],
  },
];

export const allFaqs = faqCategories.flatMap((c) => c.items);
