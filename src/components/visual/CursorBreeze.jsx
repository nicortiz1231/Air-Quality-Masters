import { useEffect, useRef, useState } from "react";

/**
 * The pointer as a short wake of air.
 *
 * A follow-chain trails the cursor. What you see is several overlapping
 * strokes of different width — a wide faint body and a few brighter
 * filaments — undulating along that chain. No live blur: that is what
 * froze the page. Touch, coarse pointers, and reduced motion all opt out.
 */

const NODES = 12;
const SPACING = 8;

const STRANDS = [
  { lag: 0.58, spread:  0.0, body: 13, core: 1.7, alpha: 0.20, wave: 1.15, phase: 0.0 },
  { lag: 0.48, spread:  3.6, body:  9, core: 1.2, alpha: 0.15, wave: 1.35, phase: 1.4 },
  { lag: 0.46, spread: -3.8, body:  9, core: 1.1, alpha: 0.14, wave: 1.40, phase: 2.7 },
  { lag: 0.36, spread:  7.2, body:  6, core: 0.8, alpha: 0.11, wave: 1.65, phase: 0.8 },
  { lag: 0.34, spread: -7.6, body:  6, core: 0.75, alpha: 0.10, wave: 1.70, phase: 3.9 },
  { lag: 0.28, spread:  1.4, body: 18, core: 0,   alpha: 0.08, wave: 0.90, phase: 2.1 },
];

const LIGHT = "230, 242, 250";
const DARK  = "22, 48, 62";

function makeStrand(x, y) {
  return Array.from({ length: NODES }, () => ({ x, y }));
}

function trace(ctx, pts) {
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length - 1; i++) {
    ctx.quadraticCurveTo(
      pts[i].x,
      pts[i].y,
      (pts[i].x + pts[i + 1].x) * 0.5,
      (pts[i].y + pts[i + 1].y) * 0.5
    );
  }
}

export default function CursorBreeze() {
  const canvasRef = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setOn(hover.matches && !motion.matches);
    update();
    hover.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      hover.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!on) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;
    let mx = 0;
    let my = 0;
    let vx = 0;
    let vy = 0;
    let heading = 0;
    let energy = 0;
    let overField = false;
    let armed = false;
    let lastX = 0;
    let lastY = 0;
    let strands = STRANDS.map(() => makeStrand(0, 0));

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(step);
    };

    const integrateAndDraw = () => {
      if (document.hidden) return false;

      const dx = mx - lastX;
      const dy = my - lastY;
      lastX = mx;
      lastY = my;
      vx = vx * 0.55 + dx * 0.45;
      vy = vy * 0.55 + dy * 0.45;
      const speed = Math.hypot(vx, vy);
      if (speed > 0.35) heading = Math.atan2(vy, vx);

      const target = Math.min(1, speed / 13);
      energy += (target - energy) * (target > energy ? 0.55 : 0.14);
      if (overField) energy *= 0.82;
      t += 0.02;

      const px = -Math.sin(heading);
      const py = Math.cos(heading);
      const amp = 0.35 + energy * 0.65;
      const spacing = SPACING * (0.22 + energy * 0.88);

      for (let s = 0; s < STRANDS.length; s++) {
        const spec = STRANDS[s];
        const nodes = strands[s];
        const spread = spec.spread * amp;
        nodes[0].x += (mx + px * spread - nodes[0].x) * spec.lag;
        nodes[0].y += (my + py * spread - nodes[0].y) * spec.lag;
        for (let i = 1; i < NODES; i++) {
          const prev = nodes[i - 1];
          const node = nodes[i];
          const rx = node.x - prev.x;
          const ry = node.y - prev.y;
          const dist = Math.hypot(rx, ry) || 1;
          const pull = ((dist - spacing) / dist) * spec.lag;
          node.x -= rx * pull;
          node.y -= ry * pull;
        }
      }

      ctx.clearRect(0, 0, w, h);
      if (!armed || energy < 0.02) return false;

      const fade = 0.2 + energy * 0.8;
      const curves = STRANDS.map((spec, s) => displace(strands[s], spec, t, amp, energy));

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Wide faint body — overlapping translucent strokes, no blur.
      ctx.globalCompositeOperation = "source-over";
      for (let s = 0; s < STRANDS.length; s++) {
        const spec = STRANDS[s];
        const pts = curves[s];
        ctx.strokeStyle = `rgba(${DARK}, ${spec.alpha * fade * 0.45})`;
        ctx.lineWidth = spec.body;
        ctx.beginPath();
        trace(ctx, pts);
        ctx.stroke();
        ctx.strokeStyle = `rgba(${LIGHT}, ${spec.alpha * fade})`;
        ctx.beginPath();
        trace(ctx, pts);
        ctx.stroke();
      }

      // Brighter inner currents. `lighter` makes them bloom where they overlap,
      // which is what a concentrated gust looks like.
      ctx.globalCompositeOperation = "lighter";
      for (let s = 0; s < STRANDS.length; s++) {
        const spec = STRANDS[s];
        if (!spec.core) continue;
        ctx.strokeStyle = `rgba(${LIGHT}, ${Math.min(0.7, spec.alpha * fade * 2.8)})`;
        ctx.lineWidth = spec.core;
        ctx.beginPath();
        trace(ctx, curves[s]);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";

      return true;
    };

    const onMove = (e) => {
      if (!armed) {
        armed = true;
        lastX = e.clientX;
        lastY = e.clientY;
        mx = e.clientX;
        my = e.clientY;
        strands = STRANDS.map(() => makeStrand(mx, my));
      }
      mx = e.clientX;
      my = e.clientY;
      const el = e.target.nodeType === 1 ? e.target : e.target.parentElement;
      overField = Boolean(el?.closest("input, textarea, select, [contenteditable='true']"));
      kick();
    };

    const onLeave = () => {
      energy *= 0.25;
      kick();
    };

    const step = () => {
      const alive = integrateAndDraw();
      raf = alive ? requestAnimationFrame(step) : 0;
    };

    const onHide = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    resize();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onHide);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [on]);

  if (!on) return null;

  return <canvas ref={canvasRef} className="cursor-breeze" aria-hidden="true" />;
}

function displace(nodes, spec, t, amp, energy) {
  const out = new Array(nodes.length);
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    if (i === 0) {
      out[i] = { x: n.x, y: n.y };
      continue;
    }
    const prev = nodes[i - 1];
    const dx = n.x - prev.x;
    const dy = n.y - prev.y;
    const len = Math.hypot(dx, dy) || 1;
    const along = i / (nodes.length - 1);
    const env = Math.sin(along * Math.PI);
    // Wave travels down the wake, so the air is moving, not a frozen S.
    const gust =
      Math.sin(along * Math.PI * 1.7 - t * 3.4 + spec.phase) +
      0.35 * Math.sin(along * 8 - t * 2.1 + spec.phase * 1.5);
    const mag = gust * spec.wave * 12 * env * amp * (0.5 + energy);
    out[i] = {
      x: n.x + (-dy / len) * mag,
      y: n.y + (dx / len) * mag,
    };
  }
  return out;
}
