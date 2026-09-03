/**
 * Smooth-scroll registry.
 *
 * Lenis keeps its own internal scroll target and reasserts it every frame, so
 * a plain window.scrollTo() is overwritten on the next tick — which is why
 * navigating to a new route used to land you wherever you clicked from rather
 * than at the top. Anything that needs to move the page has to go through the
 * instance, so the instance is registered here.
 */
let lenis = null;

export function registerLenis(instance) {
  lenis = instance;
}

export function unregisterLenis() {
  lenis = null;
}

/** Jump to the top with no animation. Safe before Lenis exists, and when
 *  reduced motion means it never will. */
export function jumpToTop() {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true, force: true });
    // Route content differs in height; without this Lenis keeps the previous
    // page's scroll limit and can refuse to travel the full new page.
    lenis.resize();
    return;
  }
  window.scrollTo(0, 0);
}

/** Animated scroll to an absolute Y. Falls back to a native smooth scroll. */
export function scrollToY(y) {
  if (lenis) {
    lenis.scrollTo(y, { duration: 0.9 });
    return;
  }
  window.scrollTo({ top: y, behavior: "smooth" });
}

/**
 * Scroll an element into view, under the fixed masthead.
 *
 * Native `#anchor` jumps do not work anywhere on this site: Lenis keeps its
 * own scroll target and reasserts it every frame, so the browser's jump is
 * undone on the next tick. Every in-page link has to come through here.
 *
 * The header offset is NOT applied here. Lenis honours the target's
 * `scroll-margin-top`, and so does scrollIntoView on the reduced-motion path,
 * so the clearance is declared once in CSS next to the element it belongs to.
 * Passing an offset as well lands the heading a full header further down the
 * page than intended — measured, not guessed: with .legal-section carrying a
 * 107px scroll-margin, an extra -103px offset overshot by exactly 107px.
 */
export function scrollToEl(el, { immediate = false } = {}) {
  if (!el) return;

  if (lenis) {
    // Route content differs in height and Lenis can be holding the previous
    // page's limits, which caps how far it will travel.
    lenis.resize();
    lenis.scrollTo(el, { duration: immediate ? 0 : 0.8, immediate, force: true });
  } else {
    el.scrollIntoView({ behavior: immediate ? "auto" : "smooth", block: "start" });
  }

  // Move the keyboard focus with the viewport. Without this a screen reader or
  // keyboard user clicking a contents link is scrolled somewhere new while
  // their focus stays behind in the list — the next Tab jumps them back.
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}
