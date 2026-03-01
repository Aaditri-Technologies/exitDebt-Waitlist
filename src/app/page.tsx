"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeContent from "@/components/HomeContent";
import WaitlistContent from "@/components/WaitlistContent";
import MarketingContent from "@/components/MarketingContent";

export default function HomePage() {
  const [view, setView] = useState<"home" | "waitlist">("home");
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (view === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // When sliding to waitlist, scroll gently to the top of the form area
      heroRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [view]);

  return (
    <div className="min-h-screen flex flex-col relative" style={{ backgroundColor: "var(--color-bg)" }}>
      <Navbar />

      {/* Top Half: The Slider (Hero vs. Waitlist Form) */}
      <div ref={heroRef} className="grid grid-cols-1 w-full overflow-hidden relative">
        <div
          className={`col-start-1 row-start-1 w-full transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${view === "home" ? "opacity-100 z-10 pointer-events-auto transform-none" : "opacity-0 pointer-events-none -translate-x-12"}`}
        >
          <HomeContent onWaitlistClick={() => setView("waitlist")} />
        </div>

        <div
          className={`col-start-1 row-start-1 w-full transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${view === "waitlist" ? "opacity-100 z-10 pointer-events-auto transform-none" : "opacity-0 pointer-events-none translate-x-12"}`}
        >
          <WaitlistContent onBack={() => setView("home")} />
        </div>
      </div>

      {/* Bottom Half: The Persistent Features Matrix and Bottom CTA */}
      <MarketingContent onWaitlistClick={() => setView("waitlist")} />

      <Footer />
    </div>
  );
}
