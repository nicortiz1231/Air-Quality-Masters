import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Seo from "../components/Seo.jsx";
import PageHero from "../components/PageHero.jsx";
import CtaSection from "../components/CtaSection.jsx";
import { services } from "../data/services.js";
import { company } from "../data/company.js";

export default function Services() {
  return (
    <>
      <Seo
        title="HVAC Services"
        description="AC repair, commercial HVAC, duct cleaning, installation, preventative maintenance and indoor air quality for South Florida homes and businesses."
        path="/services"
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.title,
            url: `${company.url}/services/${s.slug}`,
          })),
        }}
      />

      <PageHero
        eyebrow="Services"
        title={<>Everything a system<br /><em>needs, in one place.</em></>}
        lede="Six service areas covering emergency repair through planned commercial replacement. Every one starts the same way: measure the system, find the cause, quote the work, then do it."
        crumbs={[{ label: "Services" }]}
      />

      <section className="section-shell service-cards">
        {services.map((service) => (
          <article className="service-card" key={service.slug} data-reveal>
            <div className="service-card-media">
              <img src={service.image} alt={service.imageAlt} loading="lazy" />
              <span className="service-card-number">{service.number}</span>
            </div>
            <div className="service-card-body">
              <h2><Link to={`/services/${service.slug}`}>{service.title}</Link></h2>
              <p>{service.summary}</p>
              <ul className="service-card-tags">
                {service.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
              <Link className="text-link" to={`/services/${service.slug}`}>
                What this covers <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </section>

      <CtaSection />
    </>
  );
}
