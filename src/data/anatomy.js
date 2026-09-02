/**
 * The parts of a residential split system, as labelled on the cutaway diagram.
 *
 * Each entry pairs what the component does with what actually fails on it in
 * South Florida, and links to the service that covers it. This is the densest
 * genuinely useful content on the site — a homeowner can find their symptom
 * here before they ever call.
 *
 * `hot` is the hotspot position in the diagram's 1200x700 viewBox.
 */
export const anatomyParts = [
  {
    id: "condenser",
    index: "01",
    label: "Outdoor condenser",
    hot: { x: 225, y: 500 },
    does: "Rejects the heat pulled out of the house. The compressor pumps refrigerant, the coil dumps heat to outside air, and the fan moves that air through it.",
    fails: "Coil and cabinet corrosion on coastal properties, capacitors and contactors failing under year-round run hours, and coils packed with grass clippings or salt film.",
    service: "ac-repair",
  },
  {
    id: "lineset",
    index: "02",
    label: "Refrigerant line set",
    hot: { x: 400, y: 392 },
    does: "Two insulated copper lines carrying refrigerant between the outdoor and indoor units — a large cold suction line and a smaller liquid line.",
    fails: "Slow leaks at flare fittings and rub points, and stripped or missing insulation, which wastes capacity and drips condensation inside walls.",
    service: "ac-repair",
  },
  {
    id: "coil",
    index: "03",
    label: "Evaporator coil",
    hot: { x: 530, y: 336 },
    does: "Where the cooling actually happens. Warm indoor air passes over the cold coil, which drops its temperature and pulls moisture out of it.",
    fails: "Freezing over from low airflow or low charge, biological growth on a permanently damp surface, and formicary corrosion pinhole leaks.",
    service: "maintenance",
  },
  {
    id: "handler",
    index: "04",
    label: "Air handler & blower",
    hot: { x: 530, y: 470 },
    does: "The indoor cabinet. The blower pushes conditioned air into the supply duct work and pulls room air back through the return.",
    fails: "Worn blower bearings, failing capacitors, and motors struggling against a filter or duct system that is too restrictive for them.",
    service: "installation",
  },
  {
    id: "ducts",
    index: "05",
    label: "Supply duct work",
    hot: { x: 800, y: 171 },
    does: "Carries conditioned air from the air handler through the attic and out to each room through the ceiling registers.",
    fails: "Separated joints and crushed flex runs leaking cold air into a 130°F attic — often the real reason one room never cools, and a new condenser will not fix it.",
    service: "duct-cleaning",
  },
  {
    id: "return",
    index: "06",
    label: "Return air & filter",
    hot: { x: 530, y: 540 },
    does: "Draws room air back to the air handler through the filter. Everything the system delivers has to come back through here first.",
    fails: "Clogged filters choking airflow, and returns undersized for the equipment — a very common cause of poor cooling that no amount of new equipment solves.",
    service: "indoor-air-quality",
  },
  {
    id: "drain",
    index: "07",
    label: "Condensate drain",
    hot: { x: 664, y: 566 },
    does: "Carries away the water the coil pulls out of the air — in this humidity, often several gallons a day.",
    fails: "The single most common cause of a South Florida AC shutdown. The line clogs with biological growth, the pan fills, and the float switch cuts the system off to prevent water damage.",
    service: "maintenance",
  },
  {
    id: "thermostat",
    index: "08",
    label: "Thermostat",
    hot: { x: 1122, y: 375 },
    does: "Reads room temperature and tells the system when to run. It is the only part of the system most people ever touch.",
    fails: "Dead batteries, loose or corroded control wiring, and placement in a spot that misreads the house — above a lamp, in direct sun, or on an exterior wall.",
    service: "ac-repair",
  },
];
