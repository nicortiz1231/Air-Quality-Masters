import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Phone } from "lucide-react";

import Seo from "../components/Seo.jsx";
import AirflowField from "../components/visual/AirflowField.jsx";
import SystemAnatomy from "../components/visual/SystemAnatomy.jsx";
import ProcessFlow from "../components/visual/ProcessFlow.jsx";
import ComfortZone from "../components/visual/ComfortZone.jsx";
import ServiceRequestForm from "../components/ServiceRequestForm.jsx";
import { localBusinessSchema } from "../lib/seo.js";
import { company } from "../data/company.js";
import { services } from "../data/services.js";
import { featuredAreas, counties } from "../data/serviceAreas.js";
import { allFaqs } from "../data/faqs.js";

gsap.registerPlugin(ScrollTrigger);

/* Four arrival states, in the words someone would actually use, each pointing
   at the service that answers it. Not the full catalogue — that is section 02. */
const TRIAGE = [
  ["Nothing is cooling, or the air is warm.", "AC repair", "ac-repair"],
  ["It cools, but the house still feels damp.", "Ducts and airflow", "duct-cleaning"],
  ["The system is old and I am planning ahead.", "Installation", "installation"],
  ["The air itself is the problem, not the temperature.", "Air quality", "indoor-air-quality"],
];

// Exposed in dev only, for the same reason as window.__lenis: scroll-driven
// behaviour cannot be exercised from automation without a handle on it. The
// Chrome automation tab routinely lands in a state with no rAF delivery, which
// stalls every scrub — so verifying one means driving ScrollTrigger.update()
// by hand rather than trusting what the page happens to be showing.
if (import.meta.env.DEV) window.__ScrollTrigger = ScrollTrigger;

export default function Home() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // One orchestrated entrance, not a fade on every element: the words
      // arrive, the foot rule draws across, the foot content settles, and the
      // gauge draws down. fromTo, not from — React StrictMode runs this effect
      // twice, and a `from` tween reads its end value off the inline style the
      // first run already zeroed, which animates 0 -> 0 and leaves it blank.
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(
          ".hero-word span",
          { opacity: 0, yPercent: 34 },
          { opacity: 1, yPercent: 0, duration: 1.15, stagger: 0.09 }
        )
        .fromTo(".hero-rule", { scaleX: 0 }, { scaleX: 1, duration: 1.1 }, "-=0.72")
        .fromTo(
          ".hero-foot-col",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 },
          "-=0.85"
        )
        .fromTo(".hero-gauge", { opacity: 0 }, { opacity: 1, duration: 0.7 }, "-=0.95")
        // Clip rather than scale: the rule is a 1px column on wide frames and a
        // 1px row on narrow ones, and a clip does not need to know which.
        .fromTo(
          ".hero-gauge-rule",
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1 },
          "<"
        );

      // The hero recedes as the panel takes it. Driven over the stage's own
      // travel, which is exactly the pin duration.
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".hero-stage",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        })
        .fromTo(".hero-frame", { scale: 1 }, { scale: 0.93 }, 0)
        .fromTo(".hero-word", { yPercent: 0, opacity: 1 }, { yPercent: -10, opacity: 0.25 }, 0)
        .fromTo(".hero-foot", { opacity: 1, y: 0 }, { opacity: 0, y: 26 }, 0)
        .fromTo(".hero-gauge", { opacity: 1 }, { opacity: 0 }, 0)
        .fromTo(".hero-veil", { opacity: 0 }, { opacity: 0.66 }, 0);

      // Depth inside the frame while it is still the whole screen. The field
      // drifts against the type, which is the only thing that stops a canvas
      // this large from reading as flat wallpaper.
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".hero-stage",
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        })
        .fromTo(".hero-image", { yPercent: -4, scale: 1.06 }, { yPercent: 4, scale: 1 }, 0);

      // The panel's own arrival, and its contents settling once it has landed.
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".reveal",
            start: "top bottom",
            end: "top 22%",
            scrub: 0.6,
          },
        })
        .fromTo(".reveal", { scale: 0.94, borderRadius: "26px" }, { scale: 1, borderRadius: "0px" }, 0)
        .fromTo(".reveal-inner", { yPercent: 16 }, { yPercent: 0 }, 0);
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
      {/* What this business sells is a differential: the air outside becomes
          the air inside. So the hero is that traverse — the photograph is
          graded warm at the left edge and cool at the right, and the headline
          sits in the change. The equipment stands on the left because that is
          the outdoor side, which is the reading the gauge in the margin
          carries too.

          The animated flow field that used to sit between the grade and the
          scrim was removed deliberately. Do not add it back without being
          asked. The photograph is 760px wide and the frame is not, so it is
          blurred and darkened to make the upscale read as depth rather than as
          a soft image — that filter is now the only thing standing between the
          source resolution and a full-bleed frame. */}
      {/* The hero pins and the next panel rises over it.

          The pin duration and the pull-up are both percentages, which resolve
          against the container's WIDTH — so they cancel exactly and carry no
          viewport-height term. That is what keeps the whole transition intact
          at any browser zoom level, where a vh-based pin would not be. */}
      <div className="hero-stage">
        <section className="hero">
          <div className="hero-frame">
            {/* Planes at three depths, travelling at three rates. */}
            <div className="hero-image" aria-hidden="true" />
            <div className="hero-grade" aria-hidden="true" />
            <div className="hero-scrim" aria-hidden="true" />
            <div className="hero-veil" aria-hidden="true" />

            <div className="hero-content">
              {/* Two lines, the second indented, so the type moves left to
                  right across the traverse it is sitting in. */}
              <h1 className="hero-word">
                <span>Comfort,</span>
                <span>mastered.</span>
              </h1>

              {/* Not a card — a scale in the margin. The rule between the two
                  stops runs warm to cool, so the line itself is the work. */}
              <figure className="hero-gauge">
                <div className="hero-gauge-stop">
                  <span className="hero-gauge-label">Outside</span>
                  <span className="hero-gauge-value">91&deg;F</span>
                  <span className="hero-gauge-sub">74% relative humidity</span>
                </div>
                <div className="hero-gauge-rule" aria-hidden="true" />
                <div className="hero-gauge-stop">
                  <span className="hero-gauge-label">Inside</span>
                  <span className="hero-gauge-value">74&deg;F</span>
                  <span className="hero-gauge-sub">48% relative humidity</span>
                </div>
                <figcaption>Typical August conditions, illustrative</figcaption>
              </figure>

              <div className="hero-foot">
                <span className="hero-rule" aria-hidden="true" />
                <p className="hero-lede hero-foot-col">
                  AC repair, installation and air quality work for South Florida
                  homes and businesses.
                </p>
                <div className="hero-actions hero-foot-col">
                  <Link className="button button-primary" to="/contact">
                    <span>Request service</span>
                    <i aria-hidden="true"><ArrowUpRight size={17} /></i>
                  </Link>
                  <a className="hero-call" href={company.phone.href}>
                    <Phone size={15} aria-hidden="true" />
                    <span>{company.phone.display}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The pin distance, as in-flow content. Padding on .hero-stage would
            not do: a sticky box is constrained by its containing block's
            CONTENT box, so padding there leaves it zero room to travel and it
            simply scrolls away. Percentage padding resolves against width, so
            this carries no viewport-height term. */}
        <div className="hero-pin-space" aria-hidden="true" />

        {/* Inside the stage on purpose. A sticky box clamps to the bottom of
            its containing block, so if the stage outlasted this panel the
            hero's dark foot would clamp below it — and being positioned, it
            paints over the static section that follows. Ending the stage here
            makes that impossible rather than merely unlikely.

            The panel's job is to route, not to restate the hero. Someone
            arrives in a situation, not looking for a catalogue — so this is
            four arrival states rather than the six-service list, which section
            02 already carries. The trust badges that used to sit here were
            word for word the three messages in the announcement marquee. */}
        <section className="reveal">
          <div className="reveal-inner section-shell">
            <div className="reveal-head">
              <h2>Start where you are.</h2>
              <p>
                Whatever your system is doing, one of these is usually the closest
                description. It is also the fastest way to the right answer.
              </p>
            </div>

            <ul className="triage">
              {TRIAGE.map(([state, destination, slug]) => (
                <li key={slug}>
                  <Link to={`/services/${slug}`}>
                    <span className="triage-state">{state}</span>
                    <span className="triage-dest">{destination}</span>
                    <i aria-hidden="true"><ArrowUpRight size={16} /></i>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Lands at the foot of the heading column, not under the list, so
                the wording has to stand on its own rather than lean on the rows
                sitting next to it. */}
            <p className="triage-else">
              Not sure which one? Call{" "}
              <a href={company.phone.href}>{company.phone.display}</a> and
              describe what the system is doing.
            </p>
          </div>
        </section>
      </div>

      {/* ── Positioning ──────────────────────────────────────────────── */}
      <section className="intro section-shell">
        <div className="section-index" data-reveal>
          <span>01</span>
          <span>What we do</span>
        </div>

        <div className="intro-grid">
          <div className="intro-main">
            <div className="intro-headline">
              <h2 data-reveal>
                An air conditioner is not a<br />
                <em>luxury in this climate.</em>
              </h2>
            </div>

            <div className="intro-copy" data-reveal>
              <p className="lead">
                South Florida runs its cooling systems close to year-round, and in this
                climate humidity does more damage to comfort than heat does. A system here
                is not just holding a temperature — it is pulling several gallons of water
                a day out of the air, and most comfort complaints trace back to that job
                being done badly.
              </p>
              <p>
                That's the work: understanding what a system in this specific climate is
                actually doing, finding the real cause, and fixing that rather than
                replacing parts until the symptom goes away.
              </p>
              <Link className="text-link" to="/about">
                More about how we work <ArrowUpRight size={15} aria-hidden="true" />
              </Link>

              <dl className="intro-facts">
                <div>
                  <dt>Property types</dt>
                  <dd>Residential &amp; Commercial</dd>
                </div>
                <div>
                  <dt>Coverage</dt>
                  <dd>Broward · Miami-Dade · Palm Beach</dd>
                </div>
                <div>
                  <dt>Pricing</dt>
                  <dd>Quoted before work begins</dd>
                </div>
                </dl>
              </div>
          </div>

          <div className="intro-visual" data-reveal>
            <ComfortZone />
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

          <div className="svc-grid">
            {services.map((service) => (
              <Link className="svc-card" to={`/services/${service.slug}`} key={service.slug} data-reveal>
                <div className="svc-card-media">
                  <img src={service.image} alt="" loading="lazy" />
                  <span className="svc-card-num">{service.number}</span>
                </div>
                <div className="svc-card-body">
                  <h3>{service.title}</h3>
                  <p>{service.short}</p>
                  <ul className="svc-card-tags">
                    {service.tags.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                </div>
                <span className="svc-card-cta">
                  What this covers
                  <i aria-hidden="true"><ArrowUpRight size={15} /></i>
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

      {/* ── System anatomy ───────────────────────────────────────────── */}
      <section className="anatomy-section">
        <AirflowField className="anatomy-airflow" density={0.00007} opacity={0.22} speed={0.4} />
        <div className="section-shell anatomy-shell">
          <div className="section-index light" data-reveal>
            <span>03</span>
            <span>Anatomy of a system</span>
          </div>

          <div className="anatomy-head">
            <h2 data-reveal>
              Everything that can<br />
              <em>stop you cooling.</em>
            </h2>
            <p data-reveal>
              A residential split system is eight components and the connections between
              them. Find the one that matches what your system is doing — most people can
              narrow it down before they ever pick up the phone.
            </p>
          </div>

          <div data-reveal>
            <SystemAnatomy />
          </div>
        </div>
      </section>

      {/* ── Why AQM ──────────────────────────────────────────────────── */}
      <section className="trust section-shell">
        <div className="section-index" data-reveal>
          <span>04</span>
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
      <ProcessFlow />

      {/* ── Service areas ────────────────────────────────────────────── */}
      <section className="areas-teaser section-shell">
        <div className="section-index" data-reveal>
          <span>06</span>
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
          <span>07</span>
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
            <span>08</span>
            <span>Request Service</span>
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
