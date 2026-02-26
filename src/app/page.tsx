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
      <div ref={heroRef} className="relative w-full overflow-x-hidden flex">
        <div
          className={`w-full shrink-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${view === "home" ? "relative opacity-100" : "absolute opacity-0 pointer-events-none"}`}
          style={{ transform: view === "home" ? "translateX(0)" : "translateX(-50vw)" }}
        >
          <HomeContent onWaitlistClick={() => setView("waitlist")} />
        </div>

        <div
          className={`w-full shrink-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${view === "waitlist" ? "relative opacity-100" : "absolute opacity-0 pointer-events-none"}`}
          style={{ transform: view === "waitlist" ? "translateX(0)" : "translateX(50vw)" }}
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
