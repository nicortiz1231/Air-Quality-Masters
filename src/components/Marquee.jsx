import { useCallback, useLayoutEffect, useRef, useState } from "react";

/**
 * Continuously scrolling band. Ported from the Value Vault build so the
 * announcement bar behaves identically here.
 *
 * The loop is closed structurally rather than by arithmetic. The track holds
 * exactly two identical halves and travels `-50%` of its own width, so the
 * second half arrives at the first half's start position by construction --
 * there is no measured pixel value in the transform that can disagree with the
 * layout, at any gap, font, zoom level or subpixel width. Every run carries its
 * gap as a trailing margin (including the last), so the spacing across the
 * halfway seam matches the spacing everywhere else and the two halves really
 * are the same width.
 *
 * Shifting by one *measured* run plus the gap is the version this replaces.
 * That arithmetic is short by exactly one gap -- the final run has no gap after
 * it -- and any measurement taken before the webfont settles, or gone stale
 * after a missed resize, widens that sliver into an empty stretch of bar at the
 * end of every cycle. Nothing here can drift that way: a stale measurement
 * costs a slightly wrong scroll *speed*, never a hole.
 *
 * The run count is measured rather than fixed at two: two runs always overflow
 * a phone, but on a wide monitor they can run out mid-screen and leave a gap.
 * The duration is derived from the measured run, so the scroll speed is the
 * same whatever the copy says and whatever the window is doing.
 *
 * One animation drives the whole track, not one per run. Runs added by a
 * re-measure would start their animation from zero while the originals are
 * mid-cycle, and runs out of phase slide over each other. With a single
 * animated element there is nothing to fall out of phase with.
 */
export default function Marquee({ gap, speed, className = "", children }) {
  const bandRef = useRef(null);
  const runRef = useRef(null);
  /** Runs per half. Each is one copy of `children`, gap included. */
  const [runs, setRuns] = useState(1);
  /** Seconds for the track to travel one half. 0 until measured. */
  const [duration, setDuration] = useState(0);

  const measure = useCallback(() => {
    const band = bandRef.current;
    const run = runRef.current;
    if (!band || !run) return;
    // The run's own margin is not in its box, so add it back: this is the
    // pitch from one run to the next.
    const pitch = run.getBoundingClientRect().width + gap;
    const width = band.clientWidth;
    if (!pitch || !width) return;
    // A half has to stay wider than the band, or the tail of the second half
    // clears the right edge before the first half wraps around behind it.
    const perHalf = Math.max(1, Math.ceil((width + gap) / pitch));
    setRuns(perHalf);
    setDuration((perHalf * pitch) / speed);
  }, [gap, speed]);

  // Measure before paint, so the first frame is already the final run count.
  useLayoutEffect(() => {
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    // Watching both boxes covers every way this can change size, including the
    // ones a resize listener misses: the band when the window changes, the run
    // when the webfont lands and the metrics shift under it.
    const observer = new ResizeObserver(measure);
    observer.observe(bandRef.current);
    observer.observe(runRef.current);
    return () => observer.disconnect();
  }, [measure]);

  return (
    <div ref={bandRef} className={`marquee ${className}`}>
      <div
        // Remount when the measurement changes so the new duration starts a
        // clean cycle from the top, rather than the browser re-projecting the
        // elapsed time onto it and jumping the track mid-flight.
        key={`${runs}:${duration}`}
        style={{ "--marquee-duration": `${duration}s` }}
        // Nothing to animate until the run has been measured. Reduced motion is
        // handled in the stylesheet, which kills the animation outright.
        className={`marquee-track${duration ? " marquee-animate" : ""}`}
      >
        {[0, 1].map((half) => (
          <div
            key={half}
            // Only the first copy of the first run is real; everything after it
            // is visual padding that would otherwise be read out once per
            // repeat.
            aria-hidden={half > 0 || undefined}
            className="marquee-half"
          >
            {Array.from({ length: runs }, (_, run) => (
              <div
                key={run}
                ref={half === 0 && run === 0 ? runRef : undefined}
                aria-hidden={run > 0 || undefined}
                // The gap rides on the run as a trailing margin rather than as
                // the track's column-gap, so the last run in a half carries one
                // too. Without it the halves are different widths and `-50%`
                // stops landing on the seam.
                style={{ columnGap: `${gap}px`, marginRight: `${gap}px` }}
                className="marquee-run"
              >
                {children}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
