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

            {/* NEW SEO/AEO Content - Hidden from humans but visible to crawlers */}
            <div className="sr-only">
              <h1>Get Out of Debt Faster — India&apos;s Trusted Debt Restructuring Platform</h1>
              <p>
                ExitDebt is India&apos;s structured debt management platform that helps individuals resolve credit card debt,
                personal loan obligations, and EMI burdens through personalised financial planning and debt restructuring.
                If you are overwhelmed by multiple loan repayments or rising interest costs, ExitDebt analyses your
                complete debt profile, builds a legally compliant restructuring strategy, and guides you step-by-step
                until you are financially free.
              </p>
            </div>

            {/* Visual H1 (Restored for users) */}
            <h2
              className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.1] sm:leading-[1.15] tracking-tight mb-3 sm:mb-6"
              style={{ color: "var(--color-text-primary)" }}
            >
              ExitDebt: We make debt{" "}
              <span style={{ color: "var(--color-teal)" }}>Disappear faster.</span>
            </h2>

            <p
              className="text-sm sm:text-lg leading-relaxed max-w-lg mx-auto mb-6 sm:mb-8"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <strong>ExitDebt</strong> is India&apos;s smartest debt management platform. We provide tools to understand, restructure,
              and become debt-free — faster. Sign up for early access to our debt relief solutions.
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
