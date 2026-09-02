import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Services from "./components/Services";
import Process from "./components/Process";
import TrustSection from "./components/TrustSection";
import ServiceRequest from "./components/ServiceRequest";
import Contact from "./components/Contact";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function App() {
  const root = useRef();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.08,
      smoothWheel: true,
      wheelMultiplier: .92,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(".nav", { y: -18, opacity: 0, duration: .7 })
      .from(".hero-line > span", {
        yPercent: 115,
        duration: 1.05,
        stagger: .09
      }, "-=.2")
      .from(".hero-reveal", {
        y: 20,
        opacity: 0,
        duration: .75,
        stagger: .08
      }, "-=.55");

    gsap.to(".hero-image", {
      scale: 1.085,
      yPercent: 3,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.1
      }
    });

    gsap.utils.toArray("[data-reveal]").forEach((el) => {
      gsap.from(el, {
        y: 38,
        opacity: 0,
        duration: .9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%"
        }
      });
    });

    gsap.to(".process-image", {
      scale: 1.08,
      yPercent: 4,
      ease: "none",
      scrollTrigger: {
        trigger: ".process",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.1
      }
    });
  }, { scope: root });

  return (
    <div ref={root}>
      <Navigation />
      <main>
        <Hero />
        <Intro />
        <Services />
        <Process />
        <TrustSection />
        <ServiceRequest />
      </main>
      <Contact />
    </div>
  );
}
