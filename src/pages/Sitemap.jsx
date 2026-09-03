import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import PageHero from "../components/PageHero.jsx";
import { company } from "../data/company.js";
import { services } from "../data/services.js";
import { areas, counties, featuredAreas } from "../data/serviceAreas.js";
import { legalDocuments } from "../data/legal.js";

/**
 * Human-readable sitemap.
 *
 * sitemap.xml is for crawlers; this is for people — and for anyone auditing
 * the site who wants to see the whole thing at once rather than clicking
 * through a nav. It is generated from the same data modules as the nav, the
 * footer and the XML sitemap, so a page cannot exist without appearing here.
 */
export default function Sitemap() {
  const coverageOnly = areas.filter((a) => !a.featured);

  return (
    <>
      <Seo
        title="Sitemap"
        description="Every page on the Air Quality Masters site — services, service areas, company information and policies."
        path="/sitemap"
      />

      <PageHero
        eyebrow="Sitemap"
        title="Everything on this site."
        lede="One page listing the whole site. Generated from the same data as the navigation, so nothing can be listed here that does not exist, and nothing can exist without being listed."
        crumbs={[{ label: "Sitemap" }]}
      />

      <div className="section-shell sitemap-grid">
        <section data-reveal>
          <h2>Services</h2>
          <ul>
            <li><Link to="/services">All services</Link></li>
            {services.map((s) => (
              <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.title}</Link></li>
            ))}
          </ul>
        </section>

        <section data-reveal>
          <h2>Service areas</h2>
          <ul>
            <li><Link to="/service-areas">All service areas</Link></li>
            {featuredAreas.map((a) => (
              <li key={a.slug}>
                <Link to={`/service-areas/${a.slug}`}>{a.name}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section data-reveal>
          <h2>Company</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/faq">Frequently asked questions</Link></li>
            <li><Link to="/contact">Request service</Link></li>
          </ul>

          <h2>Policies</h2>
          <ul>
            {legalDocuments.map((d) => (
              <li key={d.slug}><Link to={d.path}>{d.title}</Link></li>
            ))}
          </ul>
        </section>

        <section className="sitemap-coverage" data-reveal>
          <h2>Also covered</h2>
          <p>
            Cities we dispatch to across {counties.join(", ")} that do not have a page of
            their own. Call for anywhere not listed — if it is a drive we make, we will say so.
          </p>
          <p className="sitemap-coverage-list">
            {coverageOnly.map((a) => a.name).join(" · ")}
          </p>
          <p className="sitemap-machine">
            Machine-readable version: <a href="/sitemap.xml">sitemap.xml</a>
          </p>
        </section>
      </div>

      <div className="section-shell sitemap-foot">
        <p>
          Cannot find what you are looking for? Call{" "}
          <a href={company.phone.href}>{company.phone.display}</a> or email{" "}
          <a href={`mailto:${company.email}`}>{company.email}</a>.
        </p>
      </div>
    </>
  );
}
