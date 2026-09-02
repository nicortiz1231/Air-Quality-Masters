import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-image" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-topline hero-reveal">
        <span>South Florida</span>
        <span>Residential + Commercial HVAC</span>
        <span>24/7 Team Support</span>
      </div>

      <div className="hero-layout">
        <div className="hero-heading">
          <span className="hero-line"><span>Comfort,</span></span>
          <span className="hero-line hero-line-indent"><span>mastered.</span></span>
        </div>

        <div className="hero-side hero-reveal">
          <span className="hero-eyebrow">Air Quality Masters</span>
          <p>
            Professional heating, cooling and indoor-air service built around
            clear recommendations, dependable workmanship and responsive support.
          </p>

          <div className="hero-buttons">
            <a className="button button-primary" href="#request">
              <span>Request Service</span>
              <i><ArrowUpRight size={17} /></i>
            </a>
            <a className="button button-ghost" href="#services">
              <span>Explore Services</span>
              <i><ArrowDown size={16} /></i>
            </a>
          </div>
        </div>
      </div>

      <div className="hero-bottom hero-reveal">
        <span>Oakland Park, Florida</span>
        <span>786-307-9286</span>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
