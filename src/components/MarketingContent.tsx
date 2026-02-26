"use client";

import Link from "next/link";
import React from "react";

export default function MarketingContent({ onWaitlistClick }: { onWaitlistClick: (e: React.MouseEvent) => void }) {
  return (
    <div className="w-full">
      {/* ───── FEATURES ───── */}
      <section className="max-w-6xl mx-auto px-8 py-20 lg:py-24">
        <div className="text-center mb-14 animate-fadeIn">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "var(--color-purple)" }}
          >
            What you&apos;ll get
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ color: "var(--color-text-primary)" }}
          >
            Everything to manage your debt
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              ),
              title: "Debt Health Score",
              desc: "Know exactly where you stand with a comprehensive debt health assessment.",
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: "Creditor Shield",
              desc: "Stop harassment calls. Get professional support to deal with creditors.",
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Smart Settlement",
              desc: "Negotiate better terms and save thousands on interest payments.",
            },
          ].map((feature, i) => (
            <div
              key={feature.title}
              className={`rounded-2xl p-7 hover-lift animate-slideUp stagger-${i + 1}`}
              style={{
                backgroundColor: "var(--color-bg-card)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                border: "1px solid var(--color-border)",
              }}
            >
              <span style={{ color: "var(--color-purple)" }}>{feature.icon}</span>
              <h3
                className="text-base font-bold mt-4 mb-2"
                style={{ color: "var(--color-text-primary)" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── BOTTOM CTA ───── */}
      <section style={{ backgroundColor: "var(--color-bg-soft)" }}>
        <div className="max-w-6xl mx-auto px-8 py-16 text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-3"
            style={{ color: "var(--color-text-primary)" }}
          >
            Ready to take control of your debt?
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-text-secondary)" }}>
            Join the waitlist today and be the first to know when we launch.
          </p>
          <Link
            href="#"
            onClick={(e) => { e.preventDefault(); onWaitlistClick(e); }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: "var(--color-purple)" }}
          >
            Join the Waitlist →
          </Link>
        </div>
      </section>



    </div>
  );
}
