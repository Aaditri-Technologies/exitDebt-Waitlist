"use client";

import { useState, useCallback, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeContent from "@/components/HomeContent";
import WaitlistContent from "@/components/WaitlistContent";
import MarketingContent from "@/components/MarketingContent";

const TRANSITION_MS = 450;

export default function HomePage() {
  const [displayView, setDisplayView] = useState<"home" | "waitlist">("home");
  const [phase, setPhase] = useState<"idle" | "exiting" | "entering">("idle");
  const scrollRef = useRef(0);

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
    <div className="min-h-screen flex flex-col relative" style={{ backgroundColor: "var(--color-bg)" }}>
      <Navbar />

      {/* Hero Slider — renders active view, animated via CSS keyframes */}
      <div className="w-full overflow-hidden relative" style={{ minHeight: "560px" }}>
        <div className={`hero-slider ${sliderClass}`}>
          {displayView === "home" ? (
            <HomeContent onWaitlistClick={switchToWaitlist} />
          ) : (
            <WaitlistContent onBack={switchToHome} />
          )}
        </div>
      </div>

      {/* Bottom Half: Features + Bottom CTA */}
      <MarketingContent onWaitlistClick={switchToWaitlist} />

      <Footer />
    </div>
  );
}
