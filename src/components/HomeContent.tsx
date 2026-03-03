"use client";

import Link from "next/link";
import React from "react";

export default function HomeContent({ onWaitlistClick }: { onWaitlistClick: (e: React.MouseEvent) => void }) {
  return (
    <div className="w-full">
      {/* ───── HERO ───── */}
      <section className="bg-transparent" style={{ minHeight: "420px" }}>
        <div className="max-w-6xl mx-auto px-8 py-16 lg:py-24">

          {/* Two-column grid: text left, animation right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left — Text content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Badge */}
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6"
                style={{
                  backgroundColor: "rgba(115,0,190,0.08)",
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
                className="text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8"
                style={{ color: "var(--color-text-secondary)" }}
              >
                India&apos;s smartest debt management platform. Understand, restructure,
                and become debt-free — faster. Sign up to be the first to know when we launch.
              </p>
            </div>

            {/* Right — Animation */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="hero-animation-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/animations/debt_animation.gif"
                  alt="Debt management illustration"
                  className="hero-animation-img"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* CTA — centered below both columns */}
          <div className="flex justify-center mt-8 lg:mt-10">
            <Link
              href="#"
              onClick={(e) => { e.preventDefault(); onWaitlistClick(e); }}
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
