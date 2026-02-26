"use client";

import Link from "next/link";
import React from "react";

export default function HomeContent({ onWaitlistClick }: { onWaitlistClick: (e: React.MouseEvent) => void }) {
  return (
    <div className="w-full">
      {/* ───── HERO ───── */}
      <section className="bg-transparent">
        <div className="max-w-6xl mx-auto px-8 py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center animate-fadeIn">
            {/* Badge */}
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6"
              style={{
                backgroundColor: "rgba(115,0,190,0.08)",
                color: "var(--color-purple)",
              }}
            >
              Coming Soon — Join the Waitlist
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.15] tracking-tight mb-6"
              style={{ color: "var(--color-text-primary)" }}
            >
              Exit your debt,{" "}
              <span style={{ color: "var(--color-purple)" }}>on your terms.</span>
            </h1>

            <p
              className="text-base sm:text-lg leading-relaxed max-w-lg mx-auto mb-8"
              style={{ color: "var(--color-text-secondary)" }}
            >
              India&apos;s smartest debt management platform. Understand, restructure,
              and become debt-free — faster. Sign up to be the first to know when we launch.
            </p>

            {/* CTA */}
            <Link
              href="#"
              onClick={(e) => { e.preventDefault(); onWaitlistClick(e); }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: "var(--color-purple)" }}
            >
              Join the Waitlist →
            </Link>


          </div>
        </div>
      </section>

      
    </div>
  );
}
