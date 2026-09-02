import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import Seo from "../components/Seo.jsx";
import PageHero from "../components/PageHero.jsx";
import CtaSection from "../components/CtaSection.jsx";
import ServiceRequestForm from "../components/ServiceRequestForm.jsx";
import { getService, services } from "../data/services.js";
import { company } from "../data/company.js";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);

  if (!service) return <Navigate to="/services" replace />;

  const others = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <Seo
        title={service.title}
        description={service.summary}
        path={`/services/${service.slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.summary,
          serviceType: service.title,
          provider: { "@id": `${company.url}/#business` },
          areaServed: ["Broward County", "Miami-Dade County", "Palm Beach County"].map((n) => ({
            "@type": "AdministrativeArea",
            name: n,
          })),
        }}
      />

      <PageHero
        eyebrow={`Service ${service.number}`}
        title={service.title}
        lede={service.summary}
        image={service.image}
        crumbs={[{ label: "Services", to: "/services" }, { label: service.shortTitle }]}
      />

      <section className="section-shell service-detail">
        <div className="service-detail-intro" data-reveal>
          <p className="lead">{service.intro}</p>
        </div>

        <div className="service-detail-cols">
          <div className="service-symptoms" data-reveal>
            <h2>{service.symptoms.heading}</h2>
            <ul>
              {service.symptoms.items.map((item) => (
                <li key={item}>
                  <Check size={15} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="service-work">
            <h2 data-reveal>{service.work.heading}</h2>
            <div className="service-work-list">
              {service.work.items.map(([title, copy], i) => (
                <article key={title} data-reveal>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="request" id="request">
        <div className="section-shell request-shell">
          <div className="request-grid">
            <div className="request-intro">
              <h2 data-reveal>
                Request<br />
                <em>{service.shortTitle.toLowerCase()}.</em>
              </h2>
              <p data-reveal>
                Send the details and we'll confirm a time. Mention anything you've already
                noticed — it usually shortens the first visit.
              </p>
              <a className="request-phone" href={company.phone.href} data-reveal>
                {company.phone.display}
              </a>
            </div>
            <div data-reveal>
              <ServiceRequestForm defaultService={service.title} />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell related-services">
        <span className="footer-label">Other services</span>
        <div className="related-grid">
          {others.map((o) => (
            <Link key={o.slug} to={`/services/${o.slug}`} data-reveal>
              <span>{o.number}</span>
              <h3>{o.title}</h3>
              <p>{o.summary}</p>
              <i aria-hidden="true"><ArrowUpRight size={16} /></i>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
