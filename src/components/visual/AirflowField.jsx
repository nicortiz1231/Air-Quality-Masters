import { useEffect, useRef } from "react";

/**
 * Canvas flow field — the site's signature visual.
 *
 * An HVAC company sells something invisible, so the one thing worth rendering
 * is the air itself: particles advected through a slowly evolving noise field,
 * leaving thin trails. Resolution-independent, so unlike photography it stays
 * crisp at any size, and it belongs to this business rather than to a template.
 *
 * Optionally the field carries a TRAVERSE: passed a `ramp`, a particle is
 * coloured and shaped by how far across the canvas it currently sits — warm and
 * churned at the intake edge, cool and laminar at the supply edge. That is what
 * a coil does to air, and drawing it is what makes the hero a picture of the
 * work rather than a texture behind it.
 *
 * Perf: DPR-capped, paused whenever the canvas is offscreen, and reduced to a
 * single static frame under prefers-reduced-motion.
 */

/* Steps in the precomputed temperature ramp. Building an rgb string per
   particle per frame is the one thing in this loop that would actually cost
   something, so the ramp is quantised once and indexed by position instead. */
const RAMP_STEPS = 64;

function buildRamp([from, to]) {
  const a = from.split(",").map(Number);
  const b = to.split(",").map(Number);
  return Array.from({ length: RAMP_STEPS }, (_, i) => {
    const k = i / (RAMP_STEPS - 1);
    // Smoothstep, so the handover reads as a transition with a middle rather
    // than as two temperatures meeting at a line.
    const e = k * k * (3 - 2 * k);
    return a.map((c, j) => Math.round(c + (b[j] - c) * e)).join(", ");
  });
}

/* Small value-noise + fBm. A full simplex implementation is more than this
   needs — the field only has to be smooth and non-repeating on screen. */
function makeNoise(seed = 1) {
  const perm = new Uint8Array(512);
  let s = seed;
  const rand = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a, b, t) => a + (b - a) * t;
  const grad = (h, x, y) => {
    const u = h & 1 ? -x : x;
    const v = h & 2 ? -y : y;
    return u + v;
  };

  const noise2 = (x, y) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);
    const aa = perm[perm[X] + Y];
    const ab = perm[perm[X] + Y + 1];
    const ba = perm[perm[X + 1] + Y];
    const bb = perm[perm[X + 1] + Y + 1];
    return lerp(
      lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u),
      lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u),
      v
    );
  };

  return (x, y) => {
    // Two octaves is enough structure at the scale this is drawn.
    return noise2(x, y) * 0.65 + noise2(x * 2.3, y * 2.3) * 0.35;
  };
}

export default function AirflowField({
  density = 0.00013,   // particles per px² of canvas
  speed = 0.55,
  scale = 0.0016,      // noise frequency — lower is smoother, longer streams
  color = "160, 200, 224",
  // [intakeRGB, supplyRGB]. Present = the field is a traverse; absent = a flat
  // field in `color`, which is what every other call site wants.
  ramp = null,
  opacity = 0.5,
  // Stroke-width multiplier. Under 1px a line is antialiased down to almost
  // nothing, so a field that is legible as a background detail disappears when
  // it has to carry a whole hero.
  weight = 1,
  // Share of respawns that re-enter from the left edge. High reads as
  // directional flow but starves the right of the canvas, because a particle
  // only lives for a few hundred pixels of travel and never crosses a wide
  // frame. A field carrying a traverse needs both ends populated, so it wants
  // this low.
  intake = 0.7,
  fade = 0.055,        // trail persistence; lower = longer tails
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noise = makeNoise(7);
    const shades = ramp ? buildRamp(ramp) : null;

    let raf = 0;
    let running = false;
    let particles = [];
    let w = 0;
    let h = 0;
    let t = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return false;
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const count = Math.round(w * h * density);
      particles = Array.from({ length: count }, () => spawn());
      return true;
    };

    const spawn = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      life: Math.random() * 220 + 90,
      // Slight width variation keeps the field from looking mechanical.
      wgt: (Math.random() * 0.7 + 0.35) * weight,
    });

    const step = () => {
      // Fade the previous frame rather than clearing, which is what leaves trails.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0,0,0,${fade})`;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      for (const p of particles) {
        // 0 at the intake edge, 1 at the supply edge.
        const u = shades ? Math.min(1, Math.max(0, p.x / w)) : 0;
        // Turbulence falls off across the traverse and the flow flattens: the
        // whole proposition in two terms.
        const swirl = shades ? 2.4 - 1.2 * u : 2.2;
        const rise = shades ? 0.66 - 0.4 * u : 0.6; // flatten: air moves across, not up
        const angle = noise(p.x * scale, p.y * scale + t) * Math.PI * swirl;
        const nx = p.x + Math.cos(angle) * speed;
        const ny = p.y + Math.sin(angle) * speed * rise;

        const tint = shades ? shades[Math.min(RAMP_STEPS - 1, (u * RAMP_STEPS) | 0)] : color;
        ctx.strokeStyle = `rgba(${tint}, ${Math.min(1, opacity * p.wgt)})`;
        ctx.lineWidth = p.wgt;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        p.x = nx;
        p.y = ny;
        p.life -= 1;

        if (p.life <= 0 || p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) {
          Object.assign(p, spawn());
          // Re-enter from the left edge so the field reads as directional flow.
          if (Math.random() < intake) p.x = -10;
        }
      }

      t += 0.0007;
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    if (!resize()) return;

    if (reduced) {
      // One static frame: the same field, drawn without animating.
      for (let i = 0; i < 200; i++) step0();
      function step0() {
        for (const p of particles) {
          const u = shades ? Math.min(1, Math.max(0, p.x / w)) : 0;
          const swirl = shades ? 2.4 - 1.2 * u : 2.2;
          const rise = shades ? 0.66 - 0.4 * u : 0.6;
          const angle = noise(p.x * scale, p.y * scale) * Math.PI * swirl;
          const nx = p.x + Math.cos(angle) * speed;
          const ny = p.y + Math.sin(angle) * speed * rise;
          const tint = shades ? shades[Math.min(RAMP_STEPS - 1, (u * RAMP_STEPS) | 0)] : color;
          ctx.strokeStyle = `rgba(${tint}, ${Math.min(1, opacity * 0.5 * p.wgt)})`;
          ctx.lineWidth = p.wgt;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(nx, ny);
          ctx.stroke();
          p.x = nx;
          p.y = ny;
        }
      }
      return;
    }

    // Only burn frames while the field is actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(canvas);

    const onResize = () => {
      stop();
      if (resize()) start();
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [density, speed, scale, color, ramp, opacity, weight, intake, fade]);

  return <canvas ref={canvasRef} className={`airflow-field ${className}`} aria-hidden="true" />;
}
