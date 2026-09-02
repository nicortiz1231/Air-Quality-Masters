import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { anatomyParts } from "../../data/anatomy.js";
import { getService } from "../../data/services.js";

/**
 * Interactive cutaway of a residential split system.
 *
 * Drawn as a technical section rather than an illustration — thin strokes,
 * hatched coils, dashed refrigerant lines — which matches the site's voice and
 * stays sharp at any size.
 *
 * The SVG itself is aria-hidden; the hotspots are real HTML buttons positioned
 * over it in percentage coordinates derived from the viewBox, so the diagram is
 * fully keyboard-navigable and screen-reader legible. The detail panel is the
 * accessible content, and it is present for every part regardless of hover.
 */

const VB = { w: 1200, h: 640 };

export default function SystemAnatomy() {
  const [activeId, setActiveId] = useState(anatomyParts[0].id);
  const active = anatomyParts.find((p) => p.id === activeId) ?? anatomyParts[0];
  const service = getService(active.service);

  const cls = (id) => `part${activeId === id ? " is-active" : ""}`;

  return (
    <div className="anatomy">
      <div className="anatomy-stage">
        <div className="anatomy-scroll">
        <div className="anatomy-canvas">
          <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="anatomy-svg" aria-hidden="true" role="presentation">
            <defs>
              <pattern id="coilHatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
                <line x1="0" y1="0" x2="0" y2="9" stroke="currentColor" strokeWidth="1.4" opacity=".6" />
              </pattern>
              <pattern id="blueprint" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0 H0 V40" fill="none" stroke="rgba(160,200,224,.075)" strokeWidth="1" />
              </pattern>
              <marker id="flow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0 0 L10 5 L0 10 z" fill="currentColor" stroke="none" />
              </marker>
            </defs>

            {/* Blueprint grid — gives the empty areas of the drawing a surface
                to sit on instead of reading as a void. */}
            <rect x="0" y="0" width="1200" height="640" fill="url(#blueprint)" stroke="none" />

            {/* ── Structure ───────────────────────────────────────── */}
            <g className="anatomy-structure">
              <line x1="40" y1="572" x2="1180" y2="572" />
              <path d="M402 252 L796 94 L1190 252" />
              <line x1="430" y1="252" x2="430" y2="572" />
              <line x1="1160" y1="252" x2="1160" y2="572" />
              <line x1="430" y1="252" x2="1160" y2="252" />
              <text x="900" y="150" className="anatomy-note">ATTIC · UNCONDITIONED</text>
              <text x="1136" y="556" className="anatomy-note anatomy-note-end">CONDITIONED SPACE</text>
              <text x="225" y="600" className="anatomy-note">OUTSIDE</text>
            </g>

            {/* ── 01 Condenser ────────────────────────────────────── */}
            <g className={cls("condenser")}>
              <rect x="108" y="548" width="234" height="18" rx="2" className="pad" />
              <rect x="132" y="372" width="186" height="176" rx="4" className="body" />
              <rect x="144" y="410" width="162" height="126" className="hatch" fill="url(#coilHatch)" />
              <circle cx="225" cy="372" r="48" className="body" />
              <g className="detail">
                <line x1="225" y1="372" x2="266" y2="355" />
                <line x1="225" y1="372" x2="204" y2="327" />
                <line x1="225" y1="372" x2="187" y2="394" />
              </g>
            </g>

            {/* ── 02 Line set ─────────────────────────────────────── */}
            <g className={cls("lineset")}>
              <path d="M318 432 H372 Q396 432 396 408 V352 Q396 328 420 328 H470" className="pipe pipe-suction" />
              <path d="M318 458 H386 Q416 458 416 428 V372 Q416 352 436 352 H470" className="pipe" />
            </g>

            {/* ── 04 Air handler & blower ─────────────────────────── */}
            <g className={cls("handler")}>
              <rect x="470" y="300" width="120" height="225" rx="4" className="body" />
              <circle cx="530" cy="470" r="33" className="detail-strong" />
              <path d="M530 437 A33 33 0 0 1 559 486" className="detail-strong" />
            </g>

            {/* ── 03 Evaporator coil ──────────────────────────────── */}
            <g className={cls("coil")}>
              <path d="M482 368 L530 310 L578 368" className="coil-a" />
              <path d="M492 368 L530 322 L568 368" className="coil-a" />
            </g>

            {/* ── 05 Supply duct work ─────────────────────────────── */}
            <g className={cls("ducts")}>
              <rect x="502" y="192" width="56" height="108" className="duct" />
              <rect x="502" y="148" width="598" height="46" rx="8" className="duct" />
              {[690, 860, 1030].map((x) => (
                <rect key={x} x={x - 21} y="194" width="42" height="58" className="duct" />
              ))}
              {[690, 860, 1030].map((x) => (
                <rect key={`r${x}`} x={x - 33} y="246" width="66" height="12" rx="2" className="register" />
              ))}
              <g className="flowline">
                {[690, 860, 1030].map((x) => (
                  <line key={`f${x}`} x1={x} y1="272" x2={x} y2="338" markerEnd="url(#flow)" />
                ))}
              </g>
            </g>

            {/* Air actually circulating: supply out, across the room, back to
                the return. Always visible — it is the subject, not a detail. */}
            <g className="circulation">
              <path d="M690 306 C 690 420 700 496 622 538" />
              <path d="M860 306 C 860 440 796 516 624 544" />
              <path d="M1030 306 C 1030 452 900 528 626 550" />
            </g>

            <g className="anatomy-labels">
              <text x="1030" y="292" className="anatomy-note anatomy-note-end">SUPPLY AIR</text>
              <text x="812" y="516" className="anatomy-note">RETURN AIR</text>
            </g>

            {/* ── 06 Return + filter ──────────────────────────────── */}
            <g className={cls("return")}>
              <rect x="470" y="525" width="120" height="30" className="duct" />
              <rect x="477" y="531" width="106" height="18" className="hatch" fill="url(#coilHatch)" />
              <g className="flowline">
                <line x1="700" y1="540" x2="606" y2="540" markerEnd="url(#flow)" />
              </g>
            </g>

            {/* ── 07 Condensate drain ─────────────────────────────── */}
            <g className={cls("drain")}>
              <path d="M590 508 H620 Q648 508 648 534 V548 Q648 566 668 566 H742" className="pipe" />
              <rect x="612" y="492" width="24" height="18" rx="2" className="detail-strong" />
            </g>

            {/* ── 08 Thermostat ───────────────────────────────────── */}
            <g className={cls("thermostat")}>
              <rect x="1106" y="352" width="32" height="46" rx="4" className="body" />
              <line x1="1113" y1="366" x2="1131" y2="366" className="detail" />
              <line x1="1113" y1="376" x2="1126" y2="376" className="detail" />
            </g>
          </svg>

          {/* Hotspots: real buttons so the diagram is keyboard-operable. */}
          <div className="anatomy-hotspots">
            {anatomyParts.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`hotspot${activeId === p.id ? " is-active" : ""}`}
                style={{ left: `${(p.hot.x / VB.w) * 100}%`, top: `${(p.hot.y / VB.h) * 100}%` }}
                onMouseEnter={() => setActiveId(p.id)}
                onFocus={() => setActiveId(p.id)}
                onClick={() => setActiveId(p.id)}
                aria-pressed={activeId === p.id}
              >
                <span aria-hidden="true">{p.index}</span>
                <span className="sr-only">{p.label}</span>
              </button>
            ))}
          </div>
        </div>
        </div>

        {/* ── Detail panel ──────────────────────────────────────── */}
        <div className="anatomy-detail" aria-live="polite">
          <span className="anatomy-detail-index">{active.index} / {anatomyParts.length}</span>
          <h3>{active.label}</h3>

          <div className="anatomy-detail-block">
            <span>What it does</span>
            <p>{active.does}</p>
          </div>
          <div className="anatomy-detail-block">
            <span>What goes wrong</span>
            <p>{active.fails}</p>
          </div>

          {service && (
            <Link className="anatomy-detail-link" to={`/services/${service.slug}`}>
              {service.title}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>

      {/* Compact index — doubles as the mobile control row. */}
      <ol className="anatomy-index">
        {anatomyParts.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              className={activeId === p.id ? "is-active" : ""}
              onClick={() => setActiveId(p.id)}
              aria-pressed={activeId === p.id}
            >
              <b>{p.index}</b> {p.label}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
