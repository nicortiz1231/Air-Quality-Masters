import { Menu, Phone } from "lucide-react";

export default function Navigation() {
  return (
    <header className="nav">
      <a href="#top" className="brand" aria-label="Air Quality Masters home">
        <span className="brand-monogram">AQM</span>
        <span className="brand-name">
          <strong>Air Quality Masters</strong>
          <small>Heating · Cooling · Air Quality</small>
        </span>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#services">Services</a>
        <a href="#about">Company</a>
        <a href="#process">Our Process</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="nav-actions">
        <a className="nav-phone" href="tel:+17863079286">
          <Phone size={15} />
          <span>786-307-9286</span>
        </a>
        <a className="nav-request" href="#request">
          <span>Request Service</span>
          <i>↗</i>
        </a>
        <button type="button" className="menu-button" aria-label="Open menu">
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
}
