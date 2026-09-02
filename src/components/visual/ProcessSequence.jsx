import { useEffect, useRef, useState } from "react";

/**
 * The five steps of a service call, as a sticky-scroll sequence.
 *
 * The visual column pins while the steps scroll past it, and the image swaps
 * to match whichever step is in view. Chosen over a hard ScrollTrigger pin
 * because sticky positioning cannot desync from the scroll position — with
 * smooth scrolling layered on top, a pinned section that drifts is the most
 * common way this pattern goes wrong.
 */
const steps = [
  ["01", "Listen", "We start with what you're actually experiencing and what changed — that narrows the problem before anyone opens a panel.", "/residential-condensers.jpg", "Residential condenser units outside a home"],
  ["02", "Inspect", "Pressures, electrical draw, airflow and drainage get measured. Diagnosis is a reading, not a guess.", "/coil-copper-detail.jpg", "Copper refrigerant line detail on a coil"],
  ["03", "Explain", "You get the cause in plain language, the options, and what each one costs — before any work starts.", "/mechanical-room.jpg", "Air handling equipment in a mechanical room"],
  ["04", "Resolve", "The approved repair, service or installation is completed, and the property is left the way we found it.", "/commercial-rooftop.jpg", "Rooftop HVAC equipment at dusk"],
  ["05", "Verify", "The system is tested under load and the readings are documented. That's when the job is finished.", "/architectural-vents.jpg", "Ceiling supply registers"],
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
          {steps.map(([n, , , src, alt], i) => (
            <img
              key={n}
              src={src}
              alt={i === active ? alt : ""}
              loading="lazy"
              className={i === active ? "is-active" : ""}
              aria-hidden={i !== active}
            />
          ))}
          <div className="process-media-grid" aria-hidden="true" />
        </div>

        <div className="process-progress" aria-hidden="true">
          {steps.map(([n], i) => (
            <span key={n} className={i <= active ? "is-done" : ""} />
          ))}
        </div>
        <div className="process-counter" aria-hidden="true">
          <b>{steps[active][0]}</b> / {steps[steps.length - 1][0]}
        </div>
      </div>

      <ol className="process-steps-col">
        {steps.map(([n, title, copy], i) => (
          <li
            key={n}
            ref={(el) => (itemsRef.current[i] = el)}
            className={i === active ? "is-active" : ""}
          >
            <span className="process-step-n">{n}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
