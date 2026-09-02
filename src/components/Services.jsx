import { ArrowUpRight } from "lucide-react";
import { services } from "../data/services";

export default function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="section-label">
        <span>01</span>
        <span>Capabilities</span>
      </div>

      <div className="section-title-row">
        <h2>Climate control without compromise.</h2>
        <p>
          A focused service offering for South Florida homes and businesses —
          delivered with clear communication, clean workmanship and technical
          precision.
        </p>
      </div>

      <div className="service-list">
        {services.map((service) => (
          <article className="service-row" key={service.number}>
            <div className="service-number">{service.number}</div>
            <div className="service-copy">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span>{service.detail}</span>
            </div>
            <div className="service-arrow">
              <ArrowUpRight />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
