import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { company } from "../data/company.js";
import { services } from "../data/services.js";
import { featuredAreas } from "../data/serviceAreas.js";
import { legalDocuments } from "../data/legal.js";

export default function Footer() {
  const hasHours = company.hours.weekdays || company.hours.saturday || company.hours.sunday;

  return (
    <footer className="footer" id="contact">
      <div className="section-shell">
        <div className="footer-callout">
          <span>{company.name}</span>
          <h2>
            Comfort starts with<br />
            <em>a conversation.</em>
          </h2>
          <div className="footer-callout-actions">
            <a className="button button-primary" href={company.phone.href}>
              <span>Call {company.phone.display}</span>
            </a>
            <Link className="button button-ghost-light" to="/contact">
              <span>Request Service</span>
            </Link>
          </div>
        </div>

        <div className="footer-grid">
          <div>
            <span className="footer-label">Contact</span>
            <a href={company.phone.href}><Phone size={14} aria-hidden="true" /> {company.phone.display}</a>
            <a href={`mailto:${company.email}`}><Mail size={14} aria-hidden="true" /> {company.email}</a>
            <a href={company.address.mapsUrl} target="_blank" rel="noreferrer">
              <MapPin size={14} aria-hidden="true" />
              <span>
                {company.address.street} {company.address.suite}<br />
                {company.address.city}, {company.address.state} {company.address.zip}
              </span>
            </a>
          </div>

          <div>
            <span className="footer-label">Services</span>
            {services.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`}>{s.shortTitle}</Link>
            ))}
          </div>

          <div>
            <span className="footer-label">Service Areas</span>
            {featuredAreas.slice(0, 6).map((a) => (
              <Link key={a.slug} to={`/service-areas/${a.slug}`}>{a.name}</Link>
            ))}
            <Link to="/service-areas" className="footer-more">All areas →</Link>
          </div>

          <div>
            <span className="footer-label">Company</span>
            <Link to="/about">About</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Request Service</Link>
            {hasHours && (
              <div className="footer-hours">
                {company.hours.weekdays && <span>Mon–Fri · {company.hours.weekdays}</span>}
                {company.hours.saturday && <span>Sat · {company.hours.saturday}</span>}
                {company.hours.sunday && <span>Sun · {company.hours.sunday}</span>}
              </div>
            )}
          </div>
        </div>

        {company.license.number && (
          <div className="footer-license">
            <span>
              {company.license.type || "Licensed HVAC Contractor"} · License {company.license.number}
            </span>
            <a href={company.license.verifyUrl} target="_blank" rel="noreferrer">
              Verify with the State of Florida →
            </a>
          </div>
        )}

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {company.legalName} · {company.address.city}, {company.address.state}
          </span>
          <nav className="footer-legal" aria-label="Legal">
            {legalDocuments.map((d) => (
              <Link key={d.slug} to={d.path}>{d.shortTitle}</Link>
            ))}
            <Link to="/sitemap">Sitemap</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
