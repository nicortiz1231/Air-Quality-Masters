import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Statement from "./components/Statement";
import Process from "./components/Process";
import Contact from "./components/Contact";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function App() {
  const app = useRef();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useGSAP(
    () => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });

      intro
        .from(".nav-wrap", { y: -24, opacity: 0, duration: 0.8 })
        .from(
          ".hero-line-inner",
          {
            yPercent: 115,
            rotate: 2,
            duration: 1.25,
            stagger: 0.09
          },
          "-=0.35"
        )
        .from(
          ".hero .reveal",
          {
            y: 24,
            opacity: 0,
            duration: 0.85,
            stagger: 0.08
          },
          "-=0.7"
        );

      gsap.to(".airflow-1", {
        xPercent: 14,
        yPercent: -8,
        rotate: 8,
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to(".airflow-2", {
        xPercent: -12,
        yPercent: 12,
        rotate: -10,
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.2
        }
      });

      gsap.utils.toArray(".service-row").forEach((row) => {
        gsap.from(row, {
          y: 42,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 88%"
          }
        });
      });

      gsap.from(".statement-copy", {
        y: 70,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".statement-section",
          start: "top 70%"
        }
      });

      gsap.from(".proof-card", {
        y: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".proof-grid",
          start: "top 78%"
        }
      });

      gsap.from(".process-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-grid",
          start: "top 82%"
        }
      });

      gsap.from(".contact-section h2", {
        yPercent: 28,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 68%"
        }
      });
    },
    { scope: app }
  );

  return (
    <div className="app" ref={app}>
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Statement />
        <Process />
        <Contact />
      </main>
    </div>
  );
}
