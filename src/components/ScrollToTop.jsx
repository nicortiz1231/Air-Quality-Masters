import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { jumpToTop } from "../lib/scroll.js";

/**
 * Resets scroll on route change.
 *
 * useLayoutEffect, not useEffect: this must run before the browser paints the
 * new route, otherwise there is a visible frame at the old scroll position.
 */
export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useLayoutEffect(() => {
    jumpToTop();
    // Lenis measures on its own schedule and the new route's images and fonts
    // can still be settling, so re-assert once after layout has caught up.
    const id = requestAnimationFrame(jumpToTop);
    return () => cancelAnimationFrame(id);
  }, [pathname, search]);

  return null;
}
