import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import Seo from "../components/Seo.jsx";
import PageHero from "../components/PageHero.jsx";
import CtaSection from "../components/CtaSection.jsx";
import { areasByCounty, featuredAreas } from "../data/serviceAreas.js";
import { company } from "../data/company.js";

export default function ServiceAreas() {
  return (
    <>
      <Seo
        title="Service Areas"
        description="HVAC and AC repair service across Broward, Miami-Dade and Palm Beach counties — including Fort Lauderdale, Oakland Park, Pompano Beach, Coral Springs, Hollywood and Boca Raton."
        path="/service-areas"
      />

      <PageHero
        eyebrow="Service Areas"
        title={<>South Florida,<br /><em>county to county.</em></>}
        lede={`We dispatch from ${company.address.city} across Broward, into southern Palm Beach and northern Miami-Dade. If you're near the edge of that, call and ask.`}
        crumbs={[{ label: "Service Areas" }]}
      />

      <section className="section-shell areas-featured">
        <div className="section-index" data-reveal>
          <span>01</span>
          <span>Primary areas</span>
        </div>

        <div className="areas-featured-grid">
          {featuredAreas.map((area) => (
            <Link className="area-card" to={`/service-areas/${area.slug}`} key={area.slug} data-reveal>
              <div className="area-card-head">
                <h2>{area.name}</h2>
                {area.headquarters && <em>Our office</em>}
              </div>
              <span className="area-card-county">{area.county}</span>
              <p>{area.intro}</p>
              <i aria-hidden="true"><ArrowUpRight size={16} /></i>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-shell areas-full">
        <div className="section-index" data-reveal>
          <span>02</span>
          <span>Full coverage</span>
        </div>

        <div className="areas-county-grid">
          {areasByCounty.map(({ county, cities }) => (
            <div key={county} data-reveal>
              <h3><MapPin size={15} aria-hidden="true" /> {county}</h3>
              <ul>
                {cities.map((c) =>
                  c.featured ? (
                    <li key={c.slug}><Link to={`/service-areas/${c.slug}`}>{c.name}</Link></li>
                  ) : (
                    <li key={c.slug}>{c.name}</li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <p className="areas-note" data-reveal>
          Not listed? Call the office — coverage extends past this list in places, and
          you'll get a straight yes or no rather than a wasted appointment.
        </p>
      </section>

      <CtaSection />
    </>
  );
}
