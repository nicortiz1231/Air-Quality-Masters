import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2, Phone, TriangleAlert } from "lucide-react";
import { company } from "../data/company.js";
import { services } from "../data/services.js";
import {
  CONTACT_PREFERENCES,
  FORM_NAME,
  HONEYPOT,
  PROPERTY_TYPES,
  URGENCY,
} from "../data/requestForm.js";

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * How this submission actually gets delivered.
 *
 *   web3forms   — a delivery key is configured. Posts to Web3Forms, which
 *                 relays to the office inbox. Works on any host.
 *   preview     — no key, running locally. The form validates end to end and
 *                 says plainly that nothing was sent, rather than reporting a
 *                 success that did not happen.
 *   unconfigured— no key, in production. There is nowhere to deliver to, so no
 *                 form is rendered at all: a panel points at the phone instead.
 *
 * There was a Netlify Forms path here. It is gone with the move to Vercel,
 * which has no equivalent — the host parsed a hidden form out of the deployed
 * HTML and stored submissions itself. Leaving that branch in would have posted
 * to "/", received the SPA shell or a 405, and shown an error on every send.
 *
 * The rule this encodes is the one the whole site is built on: a booking form
 * that drops requests is worse than no booking form. There is no state in
 * which a person is told "we've got it" when we have not.
 */
const isLocal =
  typeof location !== "undefined" &&
  /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);

const MODE = ACCESS_KEY ? "web3forms" : isLocal || import.meta.env.DEV ? "preview" : "unconfigured";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const digits = (s) => s.replace(/\D/g, "");

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  propertyType: "Residential",
  service: "",
  urgency: "soon",
  contactPreference: "any",
  message: "",
  consent: false,
  [HONEYPOT]: "",
};

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Please enter your name.";

  if (!v.phone.trim()) e.phone = "We need a phone number to schedule.";
  else if (digits(v.phone).length < 10) e.phone = "That doesn't look like a complete phone number.";
  else if (digits(v.phone).length > 11) e.phone = "That's more digits than a US number.";

  if (!v.email.trim()) e.email = "Please enter an email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Please check the email address.";

  // A technician cannot be dispatched to a city. This is the field that turns
  // an enquiry into something the office can actually schedule.
  if (!v.address.trim()) e.address = "We need the street address to send a technician.";
  if (!v.city.trim()) e.city = "Which city is the property in?";

  if (!v.consent) e.consent = "Please confirm we can contact you about this request.";
  return e;
}

/** Flat key/value payload. Keys match FIELDS so Netlify stores every one. */
function payload(v) {
  return {
    name: v.name.trim(),
    phone: v.phone.trim(),
    email: v.email.trim(),
    address: v.address.trim(),
    city: v.city.trim(),
    property_type: v.propertyType,
    service: v.service || "Not specified",
    urgency: URGENCY.find((u) => u.value === v.urgency)?.label || v.urgency,
    contact_preference: CONTACT_PREFERENCES.find((c) => c.value === v.contactPreference)?.label || "",
    message: v.message.trim() || "(no additional detail provided)",
    consent: "Yes — consented to be contacted about this request",
  };
}

export default function ServiceRequestForm({ defaultService = "", defaultUrgency = "soon" }) {
  const [values, setValues] = useState({
    ...EMPTY,
    service: defaultService,
    urgency: URGENCY.some((u) => u.value === defaultUrgency) ? defaultUrgency : "soon",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const set = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const isEmergency = URGENCY.find((u) => u.value === values.urgency)?.emergency;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      // Send focus to the first field that failed, not just the first error
      // node — an error message is not a thing you can type into.
      const first = Object.keys(found)[0];
      document.querySelector(`[name="${first}"]`)?.focus();
      return;
    }

    if (values[HONEYPOT]) return; // honeypot tripped; fail silently, as bots deserve

    setStatus("submitting");
    const data = payload(values);

    try {
      if (MODE === "preview") {
        // Dev server, no delivery key. Exercise the whole flow, deliver nothing,
        // and say so on the confirmation screen.
        await new Promise((r) => setTimeout(r, 550));
        setStatus("success");
        return;
      }

      const res =
        MODE === "web3forms"
          ? await fetch(WEB3FORMS_ENDPOINT, {
              method: "POST",
              headers: { "Content-Type": "application/json", Accept: "application/json" },
              body: JSON.stringify({
                access_key: ACCESS_KEY,
                subject: `${isEmergency ? "URGENT — " : ""}Service request — ${data.property_type} — ${data.city}`,
                from_name: `${company.name} website`,
                replyto: data.email,
                ...data,
              }),
            })
          : null;

      if (!res || !res.ok) throw new Error(`HTTP ${res ? res.status : "no transport"}`);

      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Submission rejected");

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  // Never render a form that cannot deliver. Without a key in production the
  // honest thing is to send people to the phone rather than take details we
  // have nowhere to send.
  if (MODE === "unconfigured") {
    return (
      <div className="form-panel form-unconfigured" role="status">
        <AlertCircle size={22} aria-hidden="true" />
        <h3>Online requests aren't connected yet</h3>
        <p>
          The booking form is ready but needs its delivery key before it can send anything.
          Rather than take your details and drop them, we'd rather you reached us directly —
          both of these come straight to the office.
        </p>
        <a className="button button-primary" href={company.phone.href}>
          <Phone size={16} aria-hidden="true" />
          <span>Call {company.phone.display}</span>
        </a>
        <a className="form-alt-link" href={`mailto:${company.email}`}>{company.email}</a>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="form-panel form-success" role="status" aria-live="polite">
        <CheckCircle2 size={30} aria-hidden="true" />
        <h3>Request received</h3>
        <p>
          Thank you, {values.name.trim().split(" ")[0]}. Your request is with our office and
          someone will be in touch to confirm a time.
        </p>

        {MODE === "preview" && (
          <p className="form-preview-note">
            <strong>Local preview:</strong> the form ran end to end and validated, but nothing was
            sent — there is no delivery key on this machine and no Netlify to receive it. Deployed,
            this submission would be delivered. See <code>.env.example</code>.
          </p>
        )}

        <p className="form-success-note">
          {isEmergency
            ? "You told us the system is down right now. Please call as well — a phone call gets you onto today's schedule in a way a form cannot."
            : "If your system goes down before you hear from us, calling is faster than waiting on a reply."}
        </p>

        <a className="button button-primary" href={company.phone.href}>
          <Phone size={16} aria-hidden="true" />
          <span>{company.phone.display}</span>
        </a>
      </div>
    );
  }

  return (
    <form
      className="request-form"
      name={FORM_NAME}
      method="POST"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Honeypot — off-screen, not display:none, so bots that check computed
          style still fill it in. Never shown to a person. */}
      <p className="hp-field" aria-hidden="true">
        <label>
          Leave this field empty
          <input
            type="text"
            name={HONEYPOT}
            tabIndex={-1}
            autoComplete="off"
            value={values[HONEYPOT]}
            onChange={set(HONEYPOT)}
          />
        </label>
      </p>

      <Field label="Full name" required error={errors.name}>
        <input
          type="text" name="name" autoComplete="name" placeholder="Your name"
          value={values.name} onChange={set("name")} aria-invalid={!!errors.name}
        />
      </Field>

      <div className="form-two">
        <Field label="Phone" required error={errors.phone}>
          <input
            type="tel" name="phone" autoComplete="tel" placeholder="(954) 000-0000"
            value={values.phone} onChange={set("phone")} aria-invalid={!!errors.phone}
          />
        </Field>
        <Field label="Email" required error={errors.email}>
          <input
            type="email" name="email" autoComplete="email" placeholder="name@email.com"
            value={values.email} onChange={set("email")} aria-invalid={!!errors.email}
          />
        </Field>
      </div>

      <Field label="Service address" required error={errors.address}>
        <input
          type="text" name="address" autoComplete="street-address"
          placeholder="Street address of the property"
          value={values.address} onChange={set("address")} aria-invalid={!!errors.address}
        />
      </Field>

      <div className="form-two">
        <Field label="City" required error={errors.city}>
          <input
            type="text" name="city" autoComplete="address-level2" placeholder="Fort Lauderdale"
            value={values.city} onChange={set("city")} aria-invalid={!!errors.city}
          />
        </Field>
        <Field label="Property type">
          <select name="property_type" value={values.propertyType} onChange={set("propertyType")}>
            {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
      </div>

      <div className="form-two">
        <Field label="What do you need?">
          <select name="service" value={values.service} onChange={set("service")}>
            <option value="">Select a service — or leave blank if unsure</option>
            {services.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
            <option value="Something else">Something else</option>
          </select>
        </Field>
        <Field label="Best way to reach you">
          <select
            name="contact_preference"
            value={values.contactPreference}
            onChange={set("contactPreference")}
          >
            {CONTACT_PREFERENCES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset className="form-urgency">
        <legend>How soon do you need someone?</legend>
        <div>
          {URGENCY.map((u) => (
            <label key={u.value} className={values.urgency === u.value ? "is-selected" : ""}>
              <input
                type="radio" name="urgency" value={u.value}
                checked={values.urgency === u.value} onChange={set("urgency")}
              />
              <span>{u.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Someone with no cooling in a Florida August is not well served by a
          form. Say so at the moment they tell us, not on the thank-you page. */}
      {isEmergency && (
        <div className="form-escalate" role="status">
          <TriangleAlert size={18} aria-hidden="true" />
          <div>
            <strong>If the system is down, call instead.</strong>
            <span>A phone call reaches the person holding today's schedule. Send this form too if you like — but don't wait on it.</span>
            <a className="button button-primary" href={company.phone.href}>
              <Phone size={15} aria-hidden="true" />
              <span>{company.phone.display}</span>
            </a>
          </div>
        </div>
      )}

      <Field
        label="Tell us what's happening"
        hint="Optional, but the more detail the better the first visit goes."
      >
        <textarea
          name="message" rows="4"
          placeholder="e.g. Upstairs isn't cooling, system runs constantly, started two days ago. Unit is about 12 years old."
          value={values.message} onChange={set("message")}
        />
      </Field>

      <label className={`form-consent${errors.consent ? " has-error" : ""}`}>
        <input
          type="checkbox" name="consent" checked={values.consent}
          onChange={set("consent")} aria-invalid={!!errors.consent}
        />
        <span>
          You can contact me by phone, text or email about this request. Standard message
          and data rates may apply. This is not a marketing subscription — see our{" "}
          <Link to="/privacy">Privacy Policy</Link>.
        </span>
      </label>
      {errors.consent && (
        <small className="field-error field-error-standalone" role="alert">{errors.consent}</small>
      )}

      {status === "error" && (
        <p className="form-error-banner" role="alert">
          <AlertCircle size={16} aria-hidden="true" />
          That didn't go through, and we'd rather tell you than let you assume it did. Please try
          again, or call <a href={company.phone.href}>{company.phone.display}</a> and we'll take the
          details over the phone.
        </p>
      )}

      <button className="submit-button" type="submit" disabled={status === "submitting"}>
        <span>{status === "submitting" ? "Sending…" : "Send service request"}</span>
        <i aria-hidden="true">
          {status === "submitting" ? <Loader2 size={17} className="spin" /> : <ArrowUpRight size={17} />}
        </i>
      </button>

      <p className="form-fineprint">
        Sending this is a request for us to get in touch — it is not a confirmed booking until we
        speak. We use your details to respond to this request only. No marketing lists, no third
        parties. <Link to="/privacy">How we handle your information →</Link>
      </p>
    </form>
  );
}

function Field({ label, required, error, hint, children }) {
  return (
    <label className={error ? "has-error" : ""}>
      <span>
        {label} {required && <i aria-hidden="true">*</i>}
      </span>
      {children}
      {hint && !error && <small className="field-hint">{hint}</small>}
      {error && <small className="field-error" role="alert">{error}</small>}
    </label>
  );
}

export { MODE };
