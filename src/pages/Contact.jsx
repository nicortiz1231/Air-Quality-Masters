import { useSearchParams } from "react-router-dom";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import Seo from "../components/Seo.jsx";
import PageHero from "../components/PageHero.jsx";
import ServiceRequestForm from "../components/ServiceRequestForm.jsx";
import TrustBadges from "../components/TrustBadges.jsx";
import { company, hasPublicAddress } from "../data/company.js";

export default function Contact() {
  const [params] = useSearchParams();
  const defaultService = params.get("service") || "";
  const hasHours = company.hours.weekdays || company.hours.saturday || company.hours.sunday;

  // /contact?intent=quote comes from the "request a quote" calls to action.
  // Same form, same office — but the page should not open by asking somebody
  // pricing a replacement how fast they need a truck.
  const isQuote = params.get("intent") === "quote";

  return (
    <>
      <Seo
        title="Request Service"
        description={`Book HVAC service with ${company.name}. Call ${company.phone.display} or send a request online — residential and commercial, across South Florida.`}
        path="/contact"
      />

      <PageHero
        eyebrow={isQuote ? "Request a quote" : "Request service"}
        title={
          isQuote
            ? <>Get a number<br /><em>you can hold us to.</em></>
            : <>Let's get it<br /><em>sorted out.</em></>
        }
        lede={
          isQuote
            ? "Tell us about the property and what you are pricing. Quotes come after somebody has looked at the system — a number given over the phone without seeing the equipment is a guess, and you would be right not to trust it."
            : "Send the details below and we'll come back to you to confirm a time. If your system is down right now, calling gets you scheduled faster than any form."
        }
        crumbs={[{ label: isQuote ? "Request a Quote" : "Request Service" }]}
      />

      <section className="section-shell contact-layout">
        <aside className="contact-details" data-reveal>
          <div className="contact-detail">
            <span className="footer-label">Call</span>
            <a className="contact-phone" href={company.phone.href}>
              <Phone size={18} aria-hidden="true" />
              {company.phone.display}
            </a>
            <p>The fastest route for an outage or anything urgent.</p>
          </div>

          <div className="contact-detail">
            <span className="footer-label">Email</span>
            <a href={`mailto:${company.email}`}>
              <Mail size={15} aria-hidden="true" /> {company.email}
            </a>
          </div>

          {hasPublicAddress && (
            <div className="contact-detail">
              <span className="footer-label">Office</span>
              <p className="contact-address">
                <MapPin size={15} aria-hidden="true" />
                <span>
                  {company.address.street} {company.address.suite}<br />
                  {company.address.city}, {company.address.state} {company.address.zip}
                </span>
              </p>
              <a href={company.address.mapsUrl} target="_blank" rel="noreferrer">
                Open in Google Maps →
              </a>
            </div>
          )}

          <div className="contact-detail">
            <span className="footer-label">What happens next</span>
            <ol className="contact-steps">
              <li>We read the request and call you back to confirm a time that works.</li>
              <li>A technician diagnoses the system and measures rather than guesses.</li>
              <li>You get the cause, the fix and the price — and you decide before any work starts.</li>
            </ol>
          </div>

          {hasHours && (
            <div className="contact-detail">
              <span className="footer-label">Hours</span>
              <ul className="contact-hours">
                <Clock3 size={15} aria-hidden="true" />
                {company.hours.weekdays && <li><b>Mon – Fri</b> {company.hours.weekdays}</li>}
                {company.hours.saturday && <li><b>Saturday</b> {company.hours.saturday}</li>}
                {company.hours.sunday && <li><b>Sunday</b> {company.hours.sunday}</li>}
              </ul>
              {company.emergencyService && (
                <p className="contact-emergency">After-hours emergency service available.</p>
              )}
            </div>
          )}
        </aside>

        <div className="contact-form-wrap" data-reveal>
          <ServiceRequestForm
            defaultService={defaultService}
            defaultUrgency={isQuote ? "quote" : "soon"}
          />
        </div>
      </section>

      <div className="section-shell badges-strip badges-strip-spaced">
        <TrustBadges />
      </div>
    </>
  );
}
