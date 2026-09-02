import { useEffect } from "react";

/**
 * Scroll-reveal for [data-reveal] elements.
 *
 * Uses IntersectionObserver rather than ScrollTrigger so it re-arms cleanly on
 * every route change without needing a refresh, and degrades to "everything
 * visible" when the user prefers reduced motion.
 */
export default function useReveal(key) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!nodes.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    nodes.forEach((n) => {
      // Anything already above the fold on load should not wait for a scroll.
      if (n.getBoundingClientRect().top < window.innerHeight * 0.92) {
        n.classList.add("is-visible");
      } else {
        io.observe(n);
      }
    });

    return () => io.disconnect();
  }, [key]);
}
