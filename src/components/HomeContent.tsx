"use client";

import Link from "next/link";
import React from "react";

export default function HomeContent({ onWaitlistClick }: { onWaitlistClick: () => void }) {
  return (
    <div className="w-full">
      {/* ───── HERO ───── */}
      <section className="bg-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-0 sm:py-4 lg:py-8">

          <div className="max-w-2xl mx-auto text-center">
            {/* Badge */}
            <div
              className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold mb-4 sm:mb-6"
              style={{
                backgroundColor: "rgba(19,78,74,0.08)",
                color: "var(--color-teal)",
              }}
            >
              Coming Soon — Join the Waitlist
            </div>

            <h1
              className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.1] sm:leading-[1.15] tracking-tight mb-3 sm:mb-6"
              style={{ color: "var(--color-text-primary)" }}
            >
              ExitDebt: We make debt{" "}
              <span style={{ color: "var(--color-teal)" }}>Disappear faster.</span>
            </h1>

            <p
              className="text-sm sm:text-lg leading-relaxed max-w-lg mx-auto mb-6 sm:mb-8"
              style={{ color: "var(--color-text-secondary)" }}
            >
              India&apos;s smartest debt management platform. Understand, restructure,
              and become debt-free — faster. Sign up to be the first to know when we launch.
            </p>
          </div>

          {/* CTA — centered below both columns */}
          <div className="flex justify-center mt-2 sm:mt-6 lg:mt-8">
            <Link
              href="#"
              onClick={(e) => { e.preventDefault(); onWaitlistClick(); }}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-bold text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: "var(--color-teal)" }}
            >
              Join the Waitlist →
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
