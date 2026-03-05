"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeContent from "@/components/HomeContent";
import WaitlistContent from "@/components/WaitlistContent";
import MarketingContent from "@/components/MarketingContent";

const TRANSITION_MS = 350;

export default function HomePage() {
  const [displayView, setDisplayView] = useState<"home" | "waitlist">("home");
  const [phase, setPhase] = useState<"idle" | "exiting" | "entering">("idle");
  const scrollRef = useRef(0);

  // Dynamic height refs for seamless push-down transition
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
  const homeRef = useRef<HTMLDivElement>(null);
  const waitlistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Measure active content height and smoothly apply it to the wrapper
    const measureHeight = () => {
      const activeRef = displayView === "home" ? homeRef : waitlistRef;
      if (activeRef.current) {
        setContainerHeight(activeRef.current.offsetHeight);
      }
    };

    measureHeight();
    window.addEventListener("resize", measureHeight);
    return () => window.removeEventListener("resize", measureHeight);
  }, [displayView, phase]);

  // Event-driven two-phase transition (no useEffect → no cascading renders)
  const transitionTo = useCallback((target: "home" | "waitlist") => {
    if (phase !== "idle" || target === displayView) return;

    // Phase 1: Exit current content
    setPhase("exiting");

    setTimeout(() => {
      // Phase 2: Swap content + enter
      setDisplayView(target);
      setPhase("entering");

      setTimeout(() => {
        setPhase("idle");
      }, TRANSITION_MS);
    }, TRANSITION_MS);
  }, [phase, displayView]);

  const switchToWaitlist = useCallback(() => {
    scrollRef.current = window.scrollY;
    transitionTo("waitlist");
    if (window.scrollY > 100) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [transitionTo]);

  const switchToHome = useCallback(() => {
    transitionTo("home");
  }, [transitionTo]);

  // CSS class for the hero slider phase
  const sliderClass =
    phase === "exiting" ? "hero-phase-exit" :
      phase === "entering" ? "hero-phase-enter" :
        "hero-phase-idle";

  return (
    <div className="flex flex-col relative" style={{ backgroundColor: "var(--color-bg)" }}>
      <Navbar />

      {/* Hero Slider — dynamically animated height to push bottom content down smoothly */}
      <div
        className="w-full overflow-hidden relative"
        style={{
          height: containerHeight ? `${containerHeight}px` : "auto",
          transition: "height 0.5s cubic-bezier(0.32, 0.72, 0, 1)"
        }}
      >
        <div className={`hero-slider ${sliderClass}`}>
          <div
            ref={homeRef}
            style={{
              opacity: displayView === "home" ? 1 : 0,
              pointerEvents: displayView === "home" ? "auto" : "none",
              visibility: displayView === "home" ? "visible" : "hidden",
              position: displayView === "home" ? "relative" : "absolute",
              top: 0,
              left: 0,
              width: "100%",
            }}
          >
            <HomeContent onWaitlistClick={switchToWaitlist} />
          </div>
          <div
            ref={waitlistRef}
            style={{
              opacity: displayView === "waitlist" ? 1 : 0,
              pointerEvents: displayView === "waitlist" ? "auto" : "none",
              visibility: displayView === "waitlist" ? "visible" : "hidden",
              position: displayView === "waitlist" ? "relative" : "absolute",
              top: 0,
              left: 0,
              width: "100%",
            }}
          >
            <WaitlistContent onBack={switchToHome} />
          </div>
        </div>
      </div>

      {/* Bottom Half: Features + Bottom CTA */}
      <MarketingContent onWaitlistClick={switchToWaitlist} />

      <Footer />
    </div>
  );
}
