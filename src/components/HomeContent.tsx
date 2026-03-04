"use client";

import Link from "next/link";
import React from "react";

export default function HomeContent({ onWaitlistClick }: { onWaitlistClick: () => void }) {
  return (
    <div className="w-full">
      {/* ───── HERO ───── */}
      <section className="bg-transparent" style={{ minHeight: "420px" }}>
        <div className="max-w-6xl mx-auto px-8 py-16 lg:py-24">

          <div className="max-w-2xl mx-auto text-center">
            {/* Badge */}
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6"
              style={{
                backgroundColor: "rgba(19,78,74,0.08)",
                color: "var(--color-teal)",
              }}
            >
              Coming Soon — Join the Waitlist
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.15] tracking-tight mb-6"
              style={{ color: "var(--color-text-primary)" }}
            >
              Exit your debt,{" "}
              <span style={{ color: "var(--color-teal)" }}>on your terms.</span>
            </h1>

            <p
              className="text-base sm:text-lg leading-relaxed max-w-lg mx-auto mb-8"
              style={{ color: "var(--color-text-secondary)" }}
            >
              India&apos;s smartest debt management platform. Understand, restructure,
              and become debt-free — faster. Sign up to be the first to know when we launch.
            </p>
          </div>

          {/* CTA — centered below both columns */}
          <div className="flex justify-center mt-8 lg:mt-10">
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
