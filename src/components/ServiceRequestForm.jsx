import { useState } from "react";
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2, Phone } from "lucide-react";
import { company } from "../data/company.js";
import { services } from "../data/services.js";

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const ENDPOINT = "https://api.web3forms.com/submit";

const PROPERTY_TYPES = ["Residential", "Commercial"];
const URGENCY = [
  { value: "emergency", label: "No cooling right now" },
  { value: "soon", label: "Needs attention this week" },
  { value: "scheduled", label: "Scheduling ahead" },
  { value: "quote", label: "Just getting a quote" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DIGITS = (s) => s.replace(/\D/g, "");

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.phone.trim()) errors.phone = "We need a phone number to schedule.";
  else if (DIGITS(values.phone).length < 10) errors.phone = "That doesn't look like a complete phone number.";
  if (!values.email.trim()) errors.email = "Please enter an email address.";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "Please check the email address.";
  if (!values.city.trim()) errors.city = "Which city is the property in?";
  return errors;
}

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  city: "",
  propertyType: "Residential",
  service: "",
  urgency: "soon",
  message: "",
  botcheck: "",
};

export default function ServiceRequestForm({ defaultService = "" }) {
  const [values, setValues] = useState({ ...EMPTY, service: defaultService });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const set = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.querySelector(".field-error")?.closest("label")?.querySelector("input, select, textarea")?.focus();
      return;
    }
    if (values.botcheck) return; // honeypot tripped

    setStatus("submitting");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Service request — ${values.propertyType} — ${values.city}`,
          from_name: `${company.name} website`,
          name: values.name,
          phone: values.phone,
          email: values.email,
          city: values.city,
          property_type: values.propertyType,
          service: values.service || "Not specified",
          urgency: URGENCY.find((u) => u.value === values.urgency)?.label,
          message: values.message || "(no additional detail provided)",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  // Never render a form that cannot deliver. Without a key, the honest thing
  // is to send people to the phone rather than swallow their request.
  if (!ACCESS_KEY) {
    return (
      <div className="form-panel form-unconfigured" role="status">
        <AlertCircle size={22} aria-hidden="true" />
        <h3>Online requests aren't connected yet</h3>
        <p>
          The booking form is ready but needs its delivery key before it can send anything.
          Until then, please call or email — both reach us directly.
        </p>
        <a className="button button-primary" href={company.phone.href}>
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
          Thank you, {values.name.split(" ")[0]}. Your request is with our office and someone will
          be in touch to confirm a time.
        </p>
        <p className="form-success-note">
          If your system is down right now and you need someone sooner, calling is faster than waiting on a reply.
        </p>
        <a className="button button-primary" href={company.phone.href}>
          <Phone size={16} aria-hidden="true" />
          <span>{company.phone.display}</span>
        </a>
      </div>
    );
  }

  return (
    <form className="request-form" onSubmit={handleSubmit} noValidate>
      {/* Honeypot — hidden from people, attractive to bots. */}
      <input
        type="checkbox"
        name="botcheck"
        className="hp-field"
        tabIndex={-1}
        autoComplete="off"
        onChange={(e) => setValues((v) => ({ ...v, botcheck: e.target.checked ? "1" : "" }))}
      />

      <Field label="Full name" required error={errors.name}>
        <input
          type="text" name="name" autoComplete="name" placeholder="Your name"
          value={values.name} onChange={set("name")}
          aria-invalid={!!errors.name}
        />
      </Field>

      <div className="form-two">
        <Field label="Phone" required error={errors.phone}>
          <input
            type="tel" name="phone" autoComplete="tel" placeholder="(954) 000-0000"
            value={values.phone} onChange={set("phone")}
            aria-invalid={!!errors.phone}
          />
        </Field>
        <Field label="Email" required error={errors.email}>
          <input
            type="email" name="email" autoComplete="email" placeholder="name@email.com"
            value={values.email} onChange={set("email")}
            aria-invalid={!!errors.email}
          />
        </Field>
      </div>

      <div className="form-two">
        <Field label="City" required error={errors.city}>
          <input
            type="text" name="city" autoComplete="address-level2" placeholder="Fort Lauderdale"
            value={values.city} onChange={set("city")}
            aria-invalid={!!errors.city}
          />
        </Field>
        <Field label="Property type">
          <select name="propertyType" value={values.propertyType} onChange={set("propertyType")}>
            {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
      </div>

      <Field label="What do you need?">
        <select name="service" value={values.service} onChange={set("service")}>
          <option value="">Select a service — or leave blank if unsure</option>
          {services.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
          <option value="Something else">Something else</option>
        </select>
      </Field>

      <fieldset className="form-urgency">
        <legend>How soon do you need someone?</legend>
        <div>
          {URGENCY.map((u) => (
            <label key={u.value} className={values.urgency === u.value ? "is-selected" : ""}>
              <input
                type="radio" name="urgency" value={u.value}
                checked={values.urgency === u.value}
                onChange={set("urgency")}
              />
              <span>{u.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="Tell us what's happening" hint="Optional, but the more detail the better the first visit goes.">
        <textarea
          name="message" rows="4"
          placeholder="e.g. Upstairs isn't cooling, system runs constantly, started two days ago. Unit is about 12 years old."
          value={values.message} onChange={set("message")}
        />
      </Field>

      {status === "error" && (
        <p className="form-error-banner" role="alert">
          <AlertCircle size={16} aria-hidden="true" />
          That didn't go through. Please try again, or call{" "}
          <a href={company.phone.href}>{company.phone.display}</a> and we'll take the details over the phone.
        </p>
      )}

      <button className="submit-button" type="submit" disabled={status === "submitting"}>
        <span>{status === "submitting" ? "Sending…" : "Send service request"}</span>
        <i aria-hidden="true">
          {status === "submitting" ? <Loader2 size={17} className="spin" /> : <ArrowUpRight size={17} />}
        </i>
      </button>

      <p className="form-fineprint">
        We use your details to respond to this request only. No marketing lists, no third parties.
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
