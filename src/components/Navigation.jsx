import { ArrowUpRight, Phone } from "lucide-react";

export default function Navigation() {
  return (
    <header className="nav-wrap">
      <a className="brand" href="#top" aria-label="Air Quality Masters home">
        <span className="brand-mark">AQM</span>
        <span className="brand-copy">
          <strong>Air Quality</strong>
          <span>Masters</span>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="#services">Services</a>
        <a href="#about">Company</a>
        <a href="#contact">Contact</a>
      </nav>

      <a className="nav-cta" href="tel:+17863079286">
        <Phone size={16} />
        <span>786 307 9286</span>
        <ArrowUpRight size={15} />
      </a>
    </header>
  );
}
