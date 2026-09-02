import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight, Phone } from "lucide-react";

import Seo from "../components/Seo.jsx";
import TrustBadges from "../components/TrustBadges.jsx";
import ServiceRequestForm from "../components/ServiceRequestForm.jsx";
import { localBusinessSchema } from "../lib/seo.js";
import { company } from "../data/company.js";
import { services } from "../data/services.js";
import { featuredAreas, counties } from "../data/serviceAreas.js";
import { allFaqs } from "../data/faqs.js";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  ["01", "Listen", "We start with what you're actually experiencing and what changed — that narrows the problem before anyone opens a panel."],
  ["02", "Inspect", "Pressures, electrical draw, airflow and drainage get measured. Diagnosis is a reading, not a guess."],
  ["03", "Explain", "You get the cause in plain language, the options, and what each one costs — before any work starts."],
  ["04", "Resolve", "The approved repair, service or installation is completed, and the property is left the way we found it."],
  ["05", "Verify", "The system is tested under load and the readings are documented. That's when the job is finished."],
];

export default function Home() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // fromTo, not from: React StrictMode runs this effect twice, and a
      // `from` tween reads its end value off the inline style the first run
      // already zeroed — which animates 0 -> 0 and leaves the hero blank.
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .fromTo(
          ".hero-line > span",
          { yPercent: 115 },
          { yPercent: 0, duration: 1.05, stagger: 0.09 }
        )
        .fromTo(
          ".hero-reveal",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.08 },
          "-=0.55"
        );

      gsap.to(".hero-image", {
        scale: 1.085, yPercent: 3, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.1 },
      });

      gsap.to(".process-image", {
        scale: 1.08, yPercent: 4, ease: "none",
        scrollTrigger: { trigger: ".process", start: "top bottom", end: "bottom top", scrub: 1.1 },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <Seo
        title="AC Repair & HVAC Service in South Florida"
        description="Residential and commercial AC repair, installation, duct cleaning and indoor air quality across Broward, Miami-Dade and Palm Beach counties. Diagnosis first, pricing before the work."
        path="/"
        schema={localBusinessSchema()}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />

        <div className="hero-topline hero-reveal">
          <span>South Florida</span>
          <span>Residential + Commercial HVAC</span>
          <span>{company.address.city}, FL</span>
        </div>

        <div className="hero-layout">
          <div className="hero-heading">
            <span className="hero-line"><span>Comfort,</span></span>
            <span className="hero-line hero-line-indent"><span>mastered.</span></span>
          </div>

          <div className="hero-side hero-reveal">
            <span className="hero-eyebrow">{company.name}</span>
            <p>
              Air conditioning repair, installation and indoor air quality work for homes
              and commercial properties across South Florida. We diagnose before we
              quote, and you approve the price before we start.
            </p>

            <div className="hero-buttons">
              <Link className="button button-primary" to="/contact">
                <span>Request Service</span>
                <i aria-hidden="true"><ArrowUpRight size={17} /></i>
              </Link>
              <a className="button button-ghost" href={company.phone.href}>
                <span>{company.phone.display}</span>
                <i aria-hidden="true"><Phone size={15} /></i>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-bottom hero-reveal">
          <Link to="/services">Explore services <ArrowDown size={13} aria-hidden="true" /></Link>
          <span>Broward · Miami-Dade · Palm Beach</span>
        </div>
      </section>

      <div className="section-shell badges-strip">
        <TrustBadges />
      </div>

      {/* ── Positioning ──────────────────────────────────────────────── */}
      <section className="intro section-shell">
        <div className="section-index" data-reveal>
          <span>01</span>
          <span>What we do</span>
        </div>

        <div className="intro-headline">
          <h2 data-reveal>
            An air conditioner is not a<br />
            <em>luxury in this climate.</em>
          </h2>
        </div>

        <div className="intro-grid">
          <div className="intro-copy" data-reveal>
            <p className="lead">
              South Florida runs its cooling systems close to year-round. Equipment here
              accumulates wear on a schedule much nearer a commercial building than a home
              in a four-season climate, and humidity introduces failure modes — clogged
              condensate drains, microbial growth in duct work, corrosion on coastal
              coils — that generic HVAC advice simply doesn't account for.
            </p>
            <p>
              That's the work: understanding what a system in this specific climate is
              actually doing, finding the real cause, and fixing that rather than
              replacing parts until the symptom goes away.
            </p>
            <Link className="text-link" to="/about">
              More about how we work <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <div className="intro-facts" data-reveal>
            <div>
              <span>Property types</span>
              <strong>Residential &amp; Commercial</strong>
            </div>
            <div>
              <span>Coverage</span>
              <strong>Broward · Miami-Dade · Palm Beach</strong>
            </div>
            <div>
              <span>Pricing</span>
              <strong>Quoted before work begins</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────── */}
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
              Six service areas covering everything from an emergency no-cooling call to a
              planned commercial equipment replacement.
            </p>
          </div>

          <div className="services-editorial-list">
            {services.map((service) => (
              <Link
                className="service-editorial-row"
                to={`/services/${service.slug}`}
                key={service.slug}
                data-reveal
              >
                <span className="service-editorial-number">{service.number}</span>
                <div className="service-editorial-main">
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                </div>
                <div className="service-editorial-tags">
                  {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <span className="service-editorial-link" aria-hidden="true">
                  <ArrowUpRight size={17} />
                </span>
              </Link>
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

      {/* ── Why AQM ──────────────────────────────────────────────────── */}
      <section className="trust section-shell">
        <div className="section-index" data-reveal>
          <span>03</span>
          <span>Why {company.shortName}</span>
        </div>

        <div className="trust-layout">
          <div>
            <h2 data-reveal>
              You should know who<br />
              <em>you're letting in.</em>
            </h2>
          </div>
          <div className="trust-copy" data-reveal>
            <p>
              HVAC is one of the few trades where you hand a stranger access to your home
              and then take their word for what's wrong. We'd rather remove the guesswork:
              show the readings, explain the cause, quote the work, and let you decide.
            </p>
          </div>
        </div>

        <div className="trust-grid">
          <article data-reveal>
            <h3>Diagnosis before quotes</h3>
            <p>
              No price is given until the system has been measured. A quote written before
              the diagnosis is a guess with a number attached to it.
            </p>
          </article>
          <article data-reveal>
            <h3>Repair-or-replace, honestly</h3>
            <p>
              When a repair approaches the cost of replacement, you get both numbers and the
              reasoning — including when the answer is that your system has years left.
            </p>
          </article>
          <article data-reveal>
            <h3>Built for this climate</h3>
            <p>
              Load calculations instead of rules of thumb, drain lines checked on every call,
              and coastal corrosion factored into equipment recommendations.
            </p>
          </article>
          <article data-reveal>
            <h3>Documented work</h3>
            <p>
              Findings and verification readings are recorded — useful for warranty claims,
              for budgeting, and for whoever services the system next.
            </p>
          </article>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────── */}
      <section className="process">
        <div className="process-visual" aria-hidden="true">
          <div className="process-image" />
          <div className="process-shade" />
        </div>

        <div className="section-shell process-shell">
          <div className="section-index light" data-reveal>
            <span>04</span>
            <span>How a service call works</span>
          </div>

          <div className="process-title">
            <h2 data-reveal>
              From the first symptom<br />
              <em>to a working system.</em>
            </h2>
          </div>

          <div className="process-steps">
            {steps.map(([n, title, copy]) => (
              <article key={n} data-reveal>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service areas ────────────────────────────────────────────── */}
      <section className="areas-teaser section-shell">
        <div className="section-index" data-reveal>
          <span>05</span>
          <span>Where we work</span>
        </div>

        <div className="areas-teaser-layout">
          <div data-reveal>
            <h2>Across South Florida.</h2>
            <p>
              We dispatch throughout {counties.join(", ").replace(/, ([^,]*)$/, " and $1")}. If
              you're near the edge of that, call and ask — a straight answer costs nothing
              and saves a wasted appointment.
            </p>
            <Link className="text-link" to="/service-areas">
              See full coverage <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <ul className="areas-teaser-list" data-reveal>
            {featuredAreas.map((area) => (
              <li key={area.slug}>
                <Link to={`/service-areas/${area.slug}`}>
                  {area.name}
                  {area.headquarters && <em>Office</em>}
                </Link>
              </li>
            ))}
            <li className="areas-teaser-more">
              <Link to="/service-areas">
                All areas
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* ── FAQ teaser ───────────────────────────────────────────────── */}
      <section className="faq-teaser section-shell">
        <div className="section-index" data-reveal>
          <span>06</span>
          <span>Common questions</span>
        </div>
        <div className="faq-teaser-grid">
          {allFaqs.slice(0, 4).map((f) => (
            <article key={f.q} data-reveal>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </article>
          ))}
        </div>
        <Link className="text-link" to="/faq" data-reveal>
          Read all questions <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </section>

      {/* ── Request ──────────────────────────────────────────────────── */}
      <section className="request" id="request">
        <div className="section-shell request-shell">
          <div className="section-index light" data-reveal>
            <span>07</span>
            <span>Request service</span>
          </div>

          <div className="request-grid">
            <div className="request-intro">
              <h2 data-reveal>
                Tell us what<br />
                <em>you need.</em>
              </h2>
              <p data-reveal>
                Send the details and we'll get back to you to confirm a time. If your system
                is down right now, calling gets you scheduled faster than any form will.
              </p>
              <a className="request-phone" href={company.phone.href} data-reveal>
                <Phone size={17} aria-hidden="true" />
                {company.phone.display}
              </a>
            </div>

            <div data-reveal>
              <ServiceRequestForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
