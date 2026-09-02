import { useState } from "react";

/**
 * Temperature / humidity comfort plot.
 *
 * The section's claim is that this climate is different, and that humidity —
 * not heat — is what actually makes a room uncomfortable. That is hard to say
 * in prose and obvious on a chart, which is the reason this exists.
 *
 * The third state is the point: an oversized system lands well left of the
 * comfort range on temperature while sitting above it on humidity. That is the
 * "cold but clammy" house, and it is the single most common comfort complaint
 * in South Florida.
 *
 * Ranges are the generally accepted comfort zone from ASHRAE Standard 55,
 * labelled as such on the chart rather than presented as our own measurement.
 */

const T_MIN = 62, T_MAX = 98;
const H_MIN = 20, H_MAX = 90;
const X0 = 62, X1 = 536, Y0 = 34, Y1 = 344;

const tx = (t) => X0 + ((t - T_MIN) / (T_MAX - T_MIN)) * (X1 - X0);
const ty = (h) => Y1 - ((h - H_MIN) / (H_MAX - H_MIN)) * (Y1 - Y0);

const STATES = [
  {
    id: "outside",
    tab: "Outside",
    t: 91,
    h: 74,
    title: "An August afternoon, outdoors",
    body: "Hot and very humid — well outside anything people find comfortable. Note how far it sits above the range vertically: the humidity is doing more of that than the heat is.",
  },
  {
    id: "oversized",
    tab: "Oversized system",
    t: 73,
    h: 68,
    title: "Cold, but still clammy",
    body: "An oversized system reaches the thermostat setting fast, shuts off, and never runs long enough to pull moisture out. The temperature is fine. The room still feels wrong — and this is caused at installation, by sizing on a rule of thumb instead of a load calculation.",
  },
  {
    id: "right",
    tab: "Right-sized system",
    t: 74,
    h: 48,
    title: "Inside the comfort range",
    body: "Correctly sized equipment runs longer, gentler cycles. That is what actually removes humidity — and it lands the room inside the range on both axes, which is the whole job.",
  },
];

export default function ComfortZone() {
  const [activeId, setActiveId] = useState("outside");
  const active = STATES.find((s) => s.id === activeId) ?? STATES[0];

  const zone = {
    x: tx(68), y: ty(60),
    w: tx(78) - tx(68),
    h: ty(30) - ty(60),
  };

  return (
    <div className="comfort">
      <div className="comfort-tabs" role="tablist" aria-label="Comfort conditions">
        {STATES.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={activeId === s.id}
            className={activeId === s.id ? "is-active" : ""}
            onClick={() => setActiveId(s.id)}
          >
            {s.tab}
          </button>
        ))}
      </div>

      <div className="comfort-plot">
        <svg viewBox="0 0 580 400" aria-hidden="true" role="presentation">
          <defs>
            <linearGradient id="czHeat" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1d6a8f" stopOpacity=".13" />
              <stop offset="55%" stopColor="#1d6a8f" stopOpacity="0" />
              <stop offset="100%" stopColor="#cf3b26" stopOpacity=".13" />
            </linearGradient>
          </defs>

          <rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} fill="url(#czHeat)" />

          {/* Grid */}
          <g className="cz-grid">
            {[70, 80, 90].map((t) => (
              <line key={`v${t}`} x1={tx(t)} y1={Y0} x2={tx(t)} y2={Y1} />
            ))}
            {[30, 45, 60, 75].map((h) => (
              <line key={`h${h}`} x1={X0} y1={ty(h)} x2={X1} y2={ty(h)} />
            ))}
          </g>

          {/* Comfort zone */}
          <g className="cz-zone">
            <rect x={zone.x} y={zone.y} width={zone.w} height={zone.h} rx="3" />
            <text x={zone.x + zone.w / 2} y={zone.y - 12}>COMFORT RANGE</text>
          </g>

          {/* Axes */}
          <g className="cz-axis">
            <line x1={X0} y1={Y1} x2={X1} y2={Y1} />
            <line x1={X0} y1={Y0} x2={X0} y2={Y1} />
            {[70, 80, 90].map((t) => (
              <text key={`tl${t}`} x={tx(t)} y={Y1 + 20} className="cz-tick">{t}°F</text>
            ))}
            {[30, 60].map((h) => (
              <text key={`hl${h}`} x={X0 - 10} y={ty(h) + 4} className="cz-tick cz-tick-y">{h}%</text>
            ))}
            <text x={(X0 + X1) / 2} y={Y1 + 44} className="cz-axis-label">TEMPERATURE</text>
            <text
              className="cz-axis-label"
              transform={`translate(18 ${(Y0 + Y1) / 2}) rotate(-90)`}
            >
              RELATIVE HUMIDITY
            </text>
          </g>

          {/* Path between the three states */}
          <polyline
            className="cz-trail"
            points={STATES.map((s) => `${tx(s.t)},${ty(s.h)}`).join(" ")}
          />

          {/* Ghost markers for the states not selected */}
          {STATES.filter((s) => s.id !== activeId).map((s) => (
            <circle key={s.id} className="cz-ghost" cx={tx(s.t)} cy={ty(s.h)} r="5" />
          ))}

          {/* Active marker */}
          <g
            className="cz-marker"
            style={{ transform: `translate(${tx(active.t)}px, ${ty(active.h)}px)` }}
          >
            <circle className="cz-marker-halo" r="19" />
            <circle className="cz-marker-dot" r="7" />
            <text y="-30">{active.t}°F · {active.h}% RH</text>
          </g>
        </svg>
      </div>

      <div className="comfort-caption" aria-live="polite">
        <h3>{active.title}</h3>
        <p>{active.body}</p>
      </div>

      <p className="comfort-note">
        Comfort range as generally defined by ASHRAE Standard 55. Positions are
        illustrative of typical conditions, not measurements of your property.
      </p>
    </div>
  );
}
