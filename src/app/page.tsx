"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeContent from "@/components/HomeContent";
import WaitlistContent from "@/components/WaitlistContent";
import MarketingContent from "@/components/MarketingContent";

export default function HomePage() {
  const [phase, setPhase] = useState<"idle" | "exiting" | "entering">("idle");
  const [displayView, setDisplayView] = useState<"home" | "waitlist">("home");

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const transitionTo = useCallback((newView: "home" | "waitlist") => {
    if (newView === displayView || phase !== "idle") return;
    setPhase("exiting");
    setTimeout(() => {
      setDisplayView(newView);
      setPhase("entering");
      setTimeout(() => setPhase("idle"), 500);
      if (newView === "waitlist") {
        heroRef.current?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 400); // Wait for exit animation
  }, [displayView, phase]);

  const switchToWaitlist = useCallback(() => {
    transitionTo("waitlist");
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
      <div className="w-full overflow-hidden relative" ref={heroRef}>
        <div className={`hero-slider ${sliderClass}`}>
          {displayView === "home" ? (
            <HomeContent onWaitlistClick={switchToWaitlist} />
          ) : (
            <WaitlistContent onBack={switchToHome} />
          )}
        </div>
      </div>

      {/* Bottom Half: Features + Bottom CTA */}
      <div ref={featuresRef}>
        <MarketingContent onWaitlistClick={switchToWaitlist} />
      </div>

      <Footer />
    </div>
  );
}
