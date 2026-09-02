import { useEffect, useRef, useState } from "react";

/**
 * The five steps of a service call, as a sticky-scroll sequence.
 *
 * The visual column pins while the steps scroll past it. Sticky positioning is
 * used rather than a hard ScrollTrigger pin because sticky cannot desync from
 * the scroll position — with smooth scrolling layered on top, a pinned section
 * that drifts is the most common way this pattern goes wrong.
 *
 * NOTE: an ancestor with overflow:hidden silently disables sticky. `.process`
 * deliberately does not clip; its parallax background clips itself instead.
 */
const steps = [
  {
    n: "01",
    title: "Listen",
    copy: "We start with what you're actually experiencing and what changed — that narrows the problem before anyone opens a panel.",
    details: ["What changed, and when", "How the system behaves now", "What has already been tried"],
    src: "/residential-condensers.jpg",
    alt: "Residential condenser units outside a home",
  },
  {
    n: "02",
    title: "Inspect",
    copy: "Pressures, electrical draw, airflow and drainage get measured. Diagnosis is a reading, not a guess.",
    details: ["Refrigerant pressures and superheat", "Electrical draw against spec", "Airflow, temperature split, drainage"],
    src: "/coil-copper-detail.jpg",
    alt: "Copper refrigerant line detail on a coil",
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
    copy: "The approved repair, service or installation is completed, and the property is left the way we found it.",
    details: ["Approved work only, no surprises", "Drop cloths and shoe covers", "Old parts left for you to see"],
    src: "/commercial-rooftop.jpg",
    alt: "Rooftop HVAC equipment at dusk",
  },
  {
    n: "05",
    title: "Verify",
    copy: "The system is tested under load and the readings are documented. That's when the job is finished.",
    details: ["Tested under real load", "Readings written down", "Drain line confirmed clear"],
    src: "/architectural-vents.jpg",
    alt: "Ceiling supply registers",
  },
];

export default function ProcessSequence() {
  const [active, setActive] = useState(0);
  const itemsRef = useRef([]);

  useEffect(() => {
    const nodes = itemsRef.current.filter(Boolean);
    if (!nodes.length) return;

    // IntersectionObserver hands back only the entries whose state CHANGED,
    // so picking "nearest the centre" from the callback argument alone can
    // choose a step that is barely on screen. Keep the full visibility map and
    // decide from every step that is currently intersecting.
    const visible = new Map();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target, e.isIntersecting));
        const candidates = nodes.filter((n) => visible.get(n));
        if (!candidates.length) return;

        const mid = window.innerHeight / 2;
        const best = candidates.reduce((a, b) => {
          const da = Math.abs(a.getBoundingClientRect().top + a.offsetHeight / 2 - mid);
          const db = Math.abs(b.getBoundingClientRect().top + b.offsetHeight / 2 - mid);
          return db < da ? b : a;
        });

        const i = nodes.indexOf(best);
        if (i >= 0) setActive(i);
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: 0 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <div className="process-sequence">
      <div className="process-visual-col">
        <div className="process-media">
          {/* Images stack in order and reveal by clip-path. Because each one is
              shown when its index <= active, moving forward wipes the next over
              the last and moving back clips it away to reveal the previous —
              no cross-fade bookkeeping needed. */}
          {steps.map((s, i) => (
            <img
              key={s.n}
              src={s.src}
              alt={i === active ? s.alt : ""}
              loading={i === 0 ? "eager" : "lazy"}
              className={i <= active ? "is-shown" : ""}
              style={{ zIndex: i + 1 }}
              aria-hidden={i !== active}
            />
          ))}
          <div className="process-media-grid" aria-hidden="true" />
          <span className="process-ghost-n" aria-hidden="true">{steps[active].n}</span>
        </div>

        <div className="process-progress" aria-hidden="true">
          {steps.map((s, i) => (
            <span key={s.n} className={i <= active ? "is-done" : ""} />
          ))}
        </div>
        <div className="process-counter" aria-hidden="true">
          <b>{steps[active].n}</b> / {steps[steps.length - 1].n}
          <em>{steps[active].title}</em>
        </div>
      </div>

      <ol className="process-steps-col">
        {steps.map((s, i) => (
          <li
            key={s.n}
            ref={(el) => (itemsRef.current[i] = el)}
            className={i === active ? "is-active" : ""}
          >
            <span className="process-step-n">{s.n}</span>
            <h3>{s.title}</h3>
            <p>{s.copy}</p>
            <ul className="process-step-details">
              {s.details.map((d, di) => (
                <li key={d} style={{ transitionDelay: `${0.08 + di * 0.07}s` }}>{d}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
