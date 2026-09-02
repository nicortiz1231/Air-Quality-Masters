import { useEffect, useRef } from "react";

/**
 * "How a service call works" as free-scrolling parallax panels.
 *
 * Deliberately NOT pinned. A pinned section holds the viewport hostage — it
 * reads as a slide deck and it makes scrolling past (or back up) feel like
 * fighting the page. These panels sit in normal document flow, so scroll speed
 * is never altered and you can fly through the whole section without friction.
 *
 * The depth comes from layers moving at different rates against the scroll:
 * the image drifts slowest, the numeral next, the copy fastest. Each layer
 * also fades toward the panel's edges so consecutive panels bleed into one
 * another rather than cutting like slides.
 *
 * Compositions alternate left/right down the section. A single repeated layout
 * is most of what makes this pattern feel like PowerPoint.
 */

export const processSteps = [
  {
    n: "01",
    title: "Listen",
    copy: "We start with what you're actually experiencing and what changed — that narrows the problem long before anyone opens a panel.",
    details: ["What changed, and when", "How the system behaves now", "What has already been tried"],
    src: "/residential-condensers.jpg",
    alt: "Residential condenser units outside a South Florida home",
  },
  {
    n: "02",
    title: "Inspect",
    copy: "Pressures, electrical draw, airflow and drainage all get measured. A diagnosis is a reading, not a guess.",
    details: ["Refrigerant pressures and superheat", "Electrical draw against spec", "Airflow, temperature split, drainage"],
    src: "/coil-copper-detail.jpg",
    alt: "Copper refrigerant lines on a condenser coil",
  },
  {
    n: "03",
    title: "Explain",
    copy: "You get the cause in plain language, the options, and what each one costs — before any work starts.",
    details: ["The actual cause, in plain language", "Repair or replace, with both numbers", "A written price before anything begins"],
    src: "/mechanical-room.jpg",
    alt: "Air handling equipment in a mechanical room",
  },
  {
    n: "04",
    title: "Resolve",
    copy: "The approved work is completed, and the property is left the way we found it.",
    details: ["Approved work only, no surprises", "Drop cloths and shoe covers", "Old parts left for you to see"],
    src: "/commercial-rooftop.jpg",
    alt: "Rooftop HVAC equipment at dusk",
  },
  {
    n: "05",
    title: "Verify",
    copy: "The system is tested under load and the readings are written down. That is when the job is finished.",
    details: ["Tested under real load", "Readings documented", "Drain line confirmed clear"],
    src: "/architectural-vents.jpg",
    alt: "Ceiling supply registers",
  },
];

/* How far each layer drifts, as a fraction of its distance from centre.
   Negative moves against the scroll, which is what reads as "further away". */
const DEPTH = { media: -0.16, num: -0.07, text: 0.05, details: 0.1 };

export default function ProcessFlow() {
  const rootRef = useRef(null);
  const panelsRef = useRef([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const panels = panelsRef.current.filter(Boolean);
    if (!panels.length) return;

    // Cache the layers once; querying them on every frame is the usual reason
    // this kind of effect gets expensive.
    const layers = panels.map((panel) => ({
      panel,
      media: panel.querySelector(".pflow-media"),
      num: panel.querySelector(".pflow-num"),
      text: panel.querySelector(".pflow-text"),
      details: panel.querySelector(".pflow-details"),
    }));

    const update = () => {
      const vh = window.innerHeight;
      const centre = vh / 2;

      // Read every rect first, then write every transform. Interleaving reads
      // and writes forces a layout on each iteration.
      const measured = layers.map((l) => {
        const r = l.panel.getBoundingClientRect();
        return { ...l, offset: r.top + r.height / 2 - centre, visible: r.bottom > -200 && r.top < vh + 200 };
      });

      for (const m of measured) {
        if (!m.visible) continue;
        // 0 at centre, 1 at roughly a viewport away.
        const away = Math.min(Math.abs(m.offset) / vh, 1);
        const fade = 1 - Math.pow(away, 1.7);

        if (m.media) {
          m.media.style.transform = `translate3d(0, ${(m.offset * DEPTH.media).toFixed(2)}px, 0) scale(${(1.14 + away * 0.05).toFixed(4)})`;
        }
        if (m.num) {
          m.num.style.transform = `translate3d(0, ${(m.offset * DEPTH.num).toFixed(2)}px, 0)`;
          m.num.style.opacity = (0.25 + fade * 0.75).toFixed(3);
        }
        if (m.text) {
          m.text.style.transform = `translate3d(0, ${(m.offset * DEPTH.text).toFixed(2)}px, 0)`;
          m.text.style.opacity = fade.toFixed(3);
        }
        if (m.details) {
          m.details.style.transform = `translate3d(0, ${(m.offset * DEPTH.details).toFixed(2)}px, 0)`;
          m.details.style.opacity = fade.toFixed(3);
        }
      }
    };

    update();
    // Browsers coalesce scroll to at most one event per frame, so reading here
    // is already frame-rate bound.
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="pflow" ref={rootRef} aria-label="How a service call works">
      <div className="pflow-lede section-shell">
        <div className="section-index light">
          <span>05</span>
          <span>How a service call works</span>
        </div>
        <h2>
          From the first symptom<br />
          <em>to a working system.</em>
        </h2>
      </div>

      {processSteps.map((step, i) => (
        <article
          className={`pflow-panel ${i % 2 ? "is-right" : "is-left"}`}
          key={step.n}
          ref={(el) => (panelsRef.current[i] = el)}
        >
          <div className="pflow-media" aria-hidden="true">
            <img src={step.src} alt="" loading={i === 0 ? "eager" : "lazy"} />
          </div>
          <div className="pflow-veil" aria-hidden="true" />

          <div className="pflow-inner section-shell">
            <span className="pflow-num" aria-hidden="true">{step.n}</span>

            <div className="pflow-text">
              <h3>
                <span className="sr-only">Step {step.n}: </span>
                {step.title}
              </h3>
              <p>{step.copy}</p>
            </div>

            <ul className="pflow-details">
              {step.details.map((d) => (
                <li key={d}><i aria-hidden="true" />{d}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </section>
  );
}
