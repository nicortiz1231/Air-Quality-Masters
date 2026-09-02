import { MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <footer className="footer" id="contact">
      <div className="section-shell">
        <div className="footer-callout">
          <span>Air Quality Masters</span>
          <h2>
            Comfort starts with<br />
            <em>a conversation.</em>
          </h2>
        </div>

        <div className="footer-grid">
          <div>
            <span className="footer-label">Phone</span>
            <a href="tel:+17863079286"><Phone size={14} /> 786-307-9286</a>
          </div>
          <div>
            <span className="footer-label">Office</span>
            <p><MapPin size={14} /> 3405 NW 44 ST Suite #106<br />Oakland Park, FL 33309</p>
          </div>
          <div>
            <span className="footer-label">Services</span>
            <a href="#services">Residential HVAC</a>
            <a href="#services">Commercial HVAC</a>
            <a href="#services">Ducts & Ventilation</a>
            <a href="#services">Installation</a>
          </div>
          <div>
            <span className="footer-label">Navigation</span>
            <a href="#about">Company</a>
            <a href="#process">Our Process</a>
            <a href="#request">Request Service</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Air Quality Masters</span>
          <span>Residential + Commercial HVAC · South Florida</span>
        </div>
      </div>
    </footer>
  );
}
