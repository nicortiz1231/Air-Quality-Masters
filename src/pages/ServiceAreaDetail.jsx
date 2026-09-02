import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowUpRight, Phone } from "lucide-react";
import Seo from "../components/Seo.jsx";
import PageHero from "../components/PageHero.jsx";
import ServiceRequestForm from "../components/ServiceRequestForm.jsx";
import { featuredAreas, getArea } from "../data/serviceAreas.js";
import { services } from "../data/services.js";
import { company, fullAddress } from "../data/company.js";

export default function ServiceAreaDetail() {
  const { slug } = useParams();
  const area = getArea(slug);

  if (!area || !area.featured) return <Navigate to="/service-areas" replace />;

  const nearby = featuredAreas.filter((a) => a.slug !== slug).slice(0, 4);

  return (
    <>
      <Seo
        title={`AC Repair & HVAC Service in ${area.name}, FL`}
        description={`Residential and commercial HVAC service in ${area.name}, ${area.county} — AC repair, installation, duct cleaning and maintenance from ${company.name} in ${company.address.city}.`}
        path={`/service-areas/${area.slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `HVAC Service in ${area.name}, FL`,
          provider: { "@id": `${company.url}/#business` },
          areaServed: { "@type": "City", name: area.name, addressRegion: "FL" },
        }}
      />

      <PageHero
        eyebrow={area.county}
        title={<>HVAC service in<br /><em>{area.name}.</em></>}
        lede={area.intro}
        crumbs={[{ label: "Service Areas", to: "/service-areas" }, { label: area.name }]}
      />

      <section className="section-shell area-detail">
        <div className="area-detail-grid">
          <div className="area-detail-copy" data-reveal>
            <h2>What we see in {area.name}</h2>
            {area.context.map((p) => <p key={p}>{p}</p>)}
            {area.headquarters ? (
              <p className="area-detail-hq">
                Our office is at {fullAddress} — so {area.name} calls are the closest
                dispatch we make.
              </p>
            ) : (
              <p className="area-detail-hq">
                We dispatch to {area.name} from our office at {fullAddress}.
              </p>
            )}
          </div>

          <aside className="area-detail-aside" data-reveal>
            <span className="footer-label">Services in {area.name}</span>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`}>
                    {s.title} <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <a className="button button-primary area-detail-call" href={company.phone.href}>
              <Phone size={16} aria-hidden="true" />
              <span>{company.phone.display}</span>
            </a>
          </aside>
        </div>
      </section>

      <section className="request">
        <div className="section-shell request-shell">
          <div className="request-grid">
            <div className="request-intro">
              <h2 data-reveal>
                Book a visit in<br />
                <em>{area.name}.</em>
              </h2>
              <p data-reveal>
                Send the details and we'll confirm a time. For a system that's down right
                now, calling is faster.
              </p>
              <a className="request-phone" href={company.phone.href} data-reveal>
                {company.phone.display}
              </a>
            </div>
            <div data-reveal>
              <ServiceRequestForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell related-services">
        <span className="footer-label">Nearby areas</span>
        <div className="related-grid related-grid-areas">
          {nearby.map((a) => (
            <Link key={a.slug} to={`/service-areas/${a.slug}`} data-reveal>
              <h3>{a.name}</h3>
              <p>{a.county}</p>
              <i aria-hidden="true"><ArrowUpRight size={16} /></i>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
