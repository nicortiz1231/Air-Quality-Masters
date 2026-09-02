import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Lenis from "lenis";
import Navigation from "./Navigation.jsx";
import Footer from "./Footer.jsx";
import MobileCallBar from "./MobileCallBar.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import useReveal from "../hooks/useReveal.js";

export default function Layout() {
  const { pathname } = useLocation();
  useReveal(pathname);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.92 });
    let raf;
    const tick = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <Navigation />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
