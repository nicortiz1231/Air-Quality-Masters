import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Residential HVAC Services",
    copy: "Diagnosis, repair and ongoing maintenance for home heating and cooling systems.",
    tags: ["AC Repair", "Maintenance", "Diagnostics"]
  },
  {
    number: "02",
    title: "Commercial HVAC Solutions",
    copy: "Installation and system servicing for offices, stores, commercial properties and larger operating environments.",
    tags: ["Commercial Service", "Rooftop Equipment", "System Support"]
  },
  {
    number: "03",
    title: "Air Duct Cleaning & Ventilation",
    copy: "Duct inspection, cleaning and ventilation service designed to improve airflow and indoor-air quality.",
    tags: ["Ductwork", "Ventilation", "Airflow"]
  },
  {
    number: "04",
    title: "Heating & Cooling Installation",
    copy: "Installation of HVAC equipment, split systems and modern climate-control solutions for residential and commercial properties.",
    tags: ["Installation", "Replacement", "Climate Control"]
  }
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="section-shell">
        <div className="section-index" data-reveal>
          <span>02</span>
          <span>Services</span>
        </div>

        <div className="services-heading">
          <h2 data-reveal>
            Complete HVAC support.<br />
            <em>One clear standard.</em>
          </h2>
          <p data-reveal>
            Straightforward service categories, clear descriptions and an easy
            path to request help when you need it.
          </p>
        </div>

        <div className="services-editorial-list">
          {services.map((service) => (
            <article className="service-editorial-row" key={service.number} data-reveal>
              <span className="service-editorial-number">{service.number}</span>

              <div className="service-editorial-main">
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </div>

              <div className="service-editorial-tags">
                {service.tags.map(tag => <span key={tag}>{tag}</span>)}
              </div>

              <a href="#request" className="service-editorial-link" aria-label={`Request ${service.title}`}>
                <ArrowUpRight size={17} />
              </a>
            </article>
          ))}
        </div>
      </div>

      <div className="services-transition-image" aria-hidden="true">
        <div className="services-transition-overlay" />
        <div className="services-transition-content section-shell">
          <span>Built around system performance</span>
          <strong>From the equipment outside to the air you feel inside.</strong>
        </div>
      </div>
    </section>
  );
}
