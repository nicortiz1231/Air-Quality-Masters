/**
 * The service request form's field contract.
 *
 * This exists so the React form and the static Netlify detection form cannot
 * drift apart. Netlify discovers forms by parsing the deployed HTML at build
 * time and only stores the fields it found there — a field added to the React
 * form but missing from the static one is accepted by the browser, reported as
 * a success, and then silently dropped. For a booking form that is the worst
 * possible failure: the customer believes they are on the schedule.
 *
 * scripts/postbuild.mjs reads FIELDS from here and writes the hidden detection
 * form into every prerendered page, so adding a field below is the only edit
 * required.
 */

export const FORM_NAME = "service-request";

/** Honeypot. Hidden from people, attractive to bots, checked before send. */
export const HONEYPOT = "botcheck";

export const FIELDS = [
  "name",
  "phone",
  "email",
  "address",
  "city",
  "property_type",
  "service",
  "urgency",
  "contact_preference",
  "message",
  "consent",
];

export const PROPERTY_TYPES = ["Residential", "Commercial"];

export const URGENCY = [
  { value: "emergency", label: "No cooling right now", emergency: true },
  { value: "soon", label: "Needs attention this week" },
  { value: "scheduled", label: "Scheduling ahead" },
  { value: "quote", label: "Just getting a quote" },
];

export const CONTACT_PREFERENCES = [
  { value: "any", label: "Whatever's quickest" },
  { value: "call", label: "Call me" },
  { value: "text", label: "Text me" },
  { value: "email", label: "Email me" },
];
