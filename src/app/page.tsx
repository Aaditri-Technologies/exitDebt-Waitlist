"use client";

import { useState, useRef, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeContent from "@/components/HomeContent";
import WaitlistContent from "@/components/WaitlistContent";
import MarketingContent from "@/components/MarketingContent";

const TRANSITION_MS = 450;

export default function HomePage() {
  const [displayView, setDisplayView] = useState<"home" | "waitlist">("home");
  const [phase, setPhase] = useState<"idle" | "exiting" | "entering">("idle");
  const featuresRef = useRef<HTMLDivElement>(null);
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
    // Remember scroll so we know whether to scroll up
    scrollRef.current = window.scrollY;
    transitionTo("waitlist");
    if (window.scrollY > 100) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [transitionTo]);

  const switchToHome = useCallback(() => {
    transitionTo("home");
  }, [transitionTo]);

  function scrollToFeatures() {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  // CSS class for the hero slider phase
  const sliderClass =
    phase === "exiting" ? "hero-phase-exit" :
    phase === "entering" ? "hero-phase-enter" :
    "hero-phase-idle";

  // Show scroll hint only when idle on home and not scrolled
  const showScrollHint = displayView === "home" && phase === "idle";

  return (
    <div className="min-h-screen flex flex-col relative" style={{ backgroundColor: "var(--color-bg)" }}>
      <Navbar />

      {/* Hero Slider — renders active view, animated via CSS keyframes */}
      <div className="w-full overflow-hidden relative">
        <div className={`hero-slider ${sliderClass}`}>
          {displayView === "home" ? (
            <HomeContent onWaitlistClick={switchToWaitlist} />
          ) : (
            <WaitlistContent onBack={switchToHome} />
          )}
        </div>
      </div>

      {/* Scroll-down indicator between hero and features */}
      {showScrollHint && (
        <ScrollHint onClick={scrollToFeatures} />
      )}

      {/* Bottom Half: Features + Bottom CTA */}
      <div ref={featuresRef}>
        <MarketingContent onWaitlistClick={switchToWaitlist} />
      </div>

      <Footer />
    </div>
  );
}

/** Scroll-down hint — extracted to keep the main component clean */
function ScrollHint({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="scroll-hint-container"
      onClick={onClick}
      role="button"
      aria-label="Scroll down to features"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}
    >
      <div className="scroll-hint-inner">
        <span className="scroll-hint-text">Scroll to explore</span>
        <svg
          className="scroll-hint-chevron"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}
