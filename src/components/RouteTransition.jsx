/**
 * Route curtain.
 *
 * Rendered with a key on the pathname, so React remounts it on every
 * navigation and the CSS animation replays. It wipes up and off, which also
 * covers the scroll reset that ScrollToTop performs underneath it.
 *
 * pointer-events are off for its whole life, so it never intercepts a tap —
 * someone hitting "call" mid-transition still gets through.
 */
export default function RouteTransition() {
  return (
    <div className="route-curtain" aria-hidden="true">
      <span />
    </div>
  );
}
