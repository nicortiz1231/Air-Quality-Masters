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
