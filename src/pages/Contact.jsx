import { useSearchParams } from "react-router-dom";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import Seo from "../components/Seo.jsx";
import PageHero from "../components/PageHero.jsx";
import ServiceRequestForm from "../components/ServiceRequestForm.jsx";
import TrustBadges from "../components/TrustBadges.jsx";
import { company } from "../data/company.js";

export default function Contact() {
  const [params] = useSearchParams();
  const defaultService = params.get("service") || "";
  const hasHours = company.hours.weekdays || company.hours.saturday || company.hours.sunday;

  return (
    <>
      <Seo
        title="Request Service"
        description={`Book HVAC service with ${company.name}. Call ${company.phone.display} or send a request online — residential and commercial, across South Florida.`}
        path="/contact"
      />

      <PageHero
        eyebrow="Request service"
        title={<>Let's get it<br /><em>sorted out.</em></>}
        lede="Send the details below and we'll come back to you to confirm a time. If your system is down right now, calling gets you scheduled faster than any form."
        crumbs={[{ label: "Request Service" }]}
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
          <ServiceRequestForm defaultService={defaultService} />
        </div>
      </section>

      <div className="section-shell badges-strip badges-strip-spaced">
        <TrustBadges />
      </div>
    </>
  );
}
