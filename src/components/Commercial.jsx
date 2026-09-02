import { ArrowUpRight } from "lucide-react";

export default function Commercial() {
  return (
    <section className="commercial-section">
      <div className="commercial-image" data-reveal>
        <img src="/commercial-rooftop.jpg" alt="Commercial rooftop HVAC equipment at sunset" />
      </div>

      <div className="commercial-copy">
        <div className="section-kicker" data-reveal>
          <span>04</span>
          <span>Commercial HVAC</span>
        </div>

        <h2 data-reveal>Downtime is expensive. Reliability matters.</h2>

        <p data-reveal>
          Commercial HVAC service needs to be organized, responsive and easy to
          communicate around. We support properties that depend on consistent
          climate control to keep people, equipment and operations comfortable.
        </p>

        <a href="#contact" data-reveal>
          Discuss commercial service <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}
