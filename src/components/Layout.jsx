import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Lenis from "lenis";
import Navigation from "./Navigation.jsx";
import Footer from "./Footer.jsx";
import MobileCallBar from "./MobileCallBar.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import RouteTransition from "./RouteTransition.jsx";
import useReveal from "../hooks/useReveal.js";
import { registerLenis, unregisterLenis } from "../lib/scroll.js";
import CursorBreeze from "./visual/CursorBreeze.jsx";

export default function Layout() {
  const { pathname } = useLocation();
  useReveal(pathname);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.92 });
    // Exposed in dev only: smooth scroll fights programmatic window.scrollTo,
    // which makes scroll-driven behaviour impossible to test without a handle
    // on the instance.
    if (import.meta.env.DEV) window.__lenis = lenis;
    registerLenis(lenis);
    let raf;
    const tick = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      unregisterLenis();
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <RouteTransition key={`curtain-${pathname}`} />
      <Navigation />
      <main id="main" className="route-enter" key={pathname}>
        <Outlet />
      </main>
      <div className="grain" aria-hidden="true" />
      <CursorBreeze />
      <Footer />
      <MobileCallBar />
    </>
  );
}
