import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-orb hero-orb-a" />
      <div className="hero-orb hero-orb-b" />

      <div className="hero-topline reveal">
        <span>South Florida HVAC</span>
        <span className="hero-status">
          <i />
          Available 24/7
        </span>
      </div>

      <div className="hero-heading-wrap">
        <h1 className="hero-heading">
          <span className="hero-line">
            <span className="hero-line-inner">Comfort,</span>
          </span>
          <span className="hero-line hero-line-offset">
            <span className="hero-line-inner">engineered.</span>
          </span>
        </h1>

        <p className="hero-intro reveal">
          Precision heating, cooling and indoor-air solutions for homes and
          businesses that expect more from their environment.
        </p>
      </div>

      <div className="hero-bottom reveal">
        <a className="primary-button" href="#contact">
          <span>Request service</span>
          <span className="button-icon">
            <ArrowUpRight size={18} />
          </span>
        </a>

        <a className="scroll-cue" href="#services">
          <span>Explore our capabilities</span>
          <ArrowDownRight size={18} />
        </a>
      </div>

      <div className="airflow airflow-1" />
      <div className="airflow airflow-2" />
      <div className="airflow airflow-3" />
    </section>
  );
}
