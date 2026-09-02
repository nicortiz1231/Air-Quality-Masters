import { useEffect, useRef, useState } from "react";
import AirflowField from "./AirflowField.jsx";
import { scrollToY } from "../../lib/scroll.js";

/**
 * "How a service call works" as a pinned, full-viewport scroller.
 *
 * The section is N × 100vh tall. Inside it, a sticky stage holds the viewport
 * for the whole scroll, and full-bleed slides take over the frame one at a
 * time. Sticky is used rather than a scroll-driven pin because it cannot
 * desync from the scroll position — with smooth scrolling on top, a JS pin
 * that drifts is the usual way this pattern falls apart.
 *
 * Which step is active comes from scroll progress through the pinned range,
 * not from IntersectionObserver markers. Progress is exact, has no rootMargin
 * edge cases, and — importantly — is measured against window.innerHeight
 * rather than the CSS `vh` unit, which can disagree with the real viewport.
 *
 * Pinning is opt-out: below 900px, and whenever reduced motion is requested,
 * the same content renders as a plain stacked list. A pinned section that
 * hijacks scrolling is genuinely unpleasant on a phone and actively hostile to
 * anyone with vestibular sensitivity.
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

const canPin = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 900px)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function ProcessScroller() {
  const [pinned, setPinned] = useState(canPin);
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);

  // Re-evaluate on resize and on a motion-preference change.
  useEffect(() => {
    const mqSize = window.matchMedia("(min-width: 900px)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPinned(canPin());
    mqSize.addEventListener("change", update);
    mqMotion.addEventListener("change", update);
    return () => {
      mqSize.removeEventListener("change", update);
      mqMotion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!pinned) return;
    const el = sectionRef.current;
    if (!el) return;

    // Read synchronously on scroll rather than deferring to rAF. Browsers
    // already coalesce scroll events to at most one per frame, and this reads
    // a single element's rect, so the rAF hop only added indirection.
    const update = () => {
      const rect = el.getBoundingClientRect();
      // Distance the section travels while the stage stays pinned.
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;
      const progress = Math.min(Math.max(-rect.top / travel, 0), 1);
      const next = Math.min(processSteps.length - 1, Math.floor(progress * processSteps.length));
      setActive((prev) => (prev === next ? prev : next));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pinned]);

  const goTo = (i) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const travel = rect.height - window.innerHeight;
    // Aim at the middle of step i's slice of the pinned range.
    const progress = (i + 0.5) / processSteps.length;
    scrollToY(Math.round(top + travel * progress));
  };

  if (!pinned) return <ProcessList />;

  const step = processSteps[active];

  return (
    <section
      className="pscroll"
      ref={sectionRef}
      style={{ "--pscroll-steps": processSteps.length }}
      aria-label="How a service call works"
    >
      <div className="pscroll-stage">
        <div className="pscroll-media" aria-hidden="true">
          {processSteps.map((s, i) => (
            <img
              key={s.n}
              src={s.src}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              className={i === active ? "is-active" : ""}
            />
          ))}
        </div>
        <div className="pscroll-veil" aria-hidden="true" />
        <AirflowField className="pscroll-air" density={0.00009} opacity={0.3} speed={0.45} />

        <div className="pscroll-inner section-shell">
          <div className="pscroll-eyebrow">
            <span>05</span>
            <span>How a service call works</span>
          </div>

          {/* Keyed on the active index so the entrance animation replays. */}
          <div className="pscroll-body" key={active}>
            <span className="pscroll-n" aria-hidden="true">{step.n}</span>
            <div className="pscroll-text">
              <h2>{step.title}</h2>
              <p>{step.copy}</p>
            </div>
            <ul className="pscroll-details">
              {step.details.map((d) => (
                <li key={d}><i aria-hidden="true" />{d}</li>
              ))}
            </ul>
          </div>

          <nav className="pscroll-rail" aria-label="Service call steps">
            {processSteps.map((s, i) => (
              <button
                key={s.n}
                type="button"
                className={i === active ? "is-active" : i < active ? "is-done" : ""}
                onClick={() => goTo(i)}
                aria-current={i === active ? "step" : undefined}
              >
                <span className="pscroll-rail-bar" aria-hidden="true" />
                <span className="pscroll-rail-label">
                  <b>{s.n}</b> {s.title}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* The full sequence, always in the DOM for assistive tech and search. */}
      <div className="sr-only">
        <h2>How a service call works</h2>
        <ol>
          {processSteps.map((s) => (
            <li key={s.n}>
              <h3>{s.n} — {s.title}</h3>
              <p>{s.copy}</p>
              <ul>{s.details.map((d) => <li key={d}>{d}</li>)}</ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Non-pinned fallback: phones, and anyone who asked for reduced motion. */
function ProcessList() {
  return (
    <section className="plist" aria-label="How a service call works">
      <div className="section-shell">
        <div className="section-index light">
          <span>05</span>
          <span>How a service call works</span>
        </div>
        <h2 className="plist-title">
          From the first symptom<br />
          <em>to a working system.</em>
        </h2>

        <ol className="plist-items">
          {processSteps.map((s) => (
            <li key={s.n}>
              <div className="plist-media">
                <img src={s.src} alt={s.alt} loading="lazy" />
                <span>{s.n}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
              <ul className="pscroll-details">
                {s.details.map((d) => <li key={d}><i aria-hidden="true" />{d}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
