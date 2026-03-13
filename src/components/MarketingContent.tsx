"use client";

import Link from "next/link";
import React from "react";

export default function MarketingContent({ onWaitlistClick }: { onWaitlistClick: () => void }) {
  return (
    <div className="w-full">
      {/* ───── FEATURES ───── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 pt-2 sm:pt-6 lg:pb-16 lg:pt-10">
        <div className="text-center mb-6 sm:mb-8">
          <p
            className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2 sm:mb-3"
            style={{ color: "var(--color-teal)" }}
          >
            What you&apos;ll get
          </p>
          <h2
            className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            How ExitDebt Helps You Manage Your Debt
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
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
          ].map((feature) => (
            <div
              key={feature.title}
              className={`rounded-2xl p-7 hover-lift`}
              style={{
                backgroundColor: "var(--color-bg-card)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                border: "1px solid var(--color-border)",
              }}
            >
              <span style={{ color: "var(--color-teal)" }}>{feature.icon}</span>
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

      <div className="sr-only">
        {/* ───── WHAT IS EXITDEBT (Brand Definition) ───── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 border-t border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: "var(--color-text-primary)" }}>
                What Is ExitDebt?
              </h2>
              <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: "var(--color-text-secondary)" }}>
                ExitDebt is a fintech platform built for individuals in India who are struggling with debt from credit cards, personal loans, or multiple EMI repayments. Unlike general financial advice platforms, ExitDebt provides a structured, data-driven approach: it assesses your Debt Health Score, develops a personalised repayment or restructuring strategy, and offers creditor support services to stop harassment and negotiate better terms on your behalf.
              </p>
            </div>
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold mb-4" style={{ color: "var(--color-text-primary)" }}>Understanding Debt Restructuring in India</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text-secondary)" }}>
                Debt restructuring is the process of renegotiating the terms of an existing loan to make it more manageable. This can involve extending tenure, reducing interest rates, or converting credit card balances into structured EMIs.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                It is fully legal in India and supported by <strong>Reserve Bank of India (RBI)</strong> guidelines.
              </p>
            </div>
          </div>
        </section>

        {/* ───── COMPARISON TABLE ───── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 bg-[#fcfdfd] border-y border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: "var(--color-text-primary)" }}>
              Debt Consolidation vs. Debt Settlement
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-5 text-sm font-bold border-b border-gray-100">Feature</th>
                  <th className="p-5 text-sm font-bold border-b border-gray-100" style={{ color: "var(--color-teal)" }}>Debt Consolidation</th>
                  <th className="p-5 text-sm font-bold border-b border-gray-100 text-red-600">Debt Settlement</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="p-5 border-b border-gray-100 font-semibold">Definition</td>
                  <td className="p-5 border-b border-gray-100">Combining debts into one loan</td>
                  <td className="p-5 border-b border-gray-100">Negotiating a lower payout</td>
                </tr>
                <tr>
                  <td className="p-5 border-b border-gray-100 font-semibold">Credit Score Impact</td>
                  <td className="p-5 border-b border-gray-100">Minimal to positive impact</td>
                  <td className="p-5 border-b border-gray-100">Severe negative impact</td>
                </tr>
                <tr>
                  <td className="p-5 border-b border-gray-100 font-semibold">Legal Status</td>
                  <td className="p-5 border-b border-gray-100">Fully bank-supported</td>
                  <td className="p-5 border-b border-gray-100">Last resort negotiation</td>
                </tr>
                <tr>
                  <td className="p-5 border-b border-gray-100 font-semibold">ExitDebt Recommendation</td>
                  <td className="p-5 border-b border-gray-100">Primary Approach</td>
                  <td className="p-5 border-b border-gray-100">Case-by-case basis</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-text-primary)" }}>How to Get Out of Credit Card Debt in India</h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                Credit card debt is one of the most expensive forms of debt in India, with annual interest rates typically ranging from 30% to 42%. Left unmanaged, interest compounds rapidly. To exit effectively: (1) Stop adding new charges. (2) Audit your total outstanding balance. (3) Negotiate an EMI conversion. (4) Use ExitDebt to identify the fastest repayment path based on your income.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-text-primary)" }}>How to Reduce EMI Burden in India</h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                Managing multiple EMIs across loans can be mentally exhausting. Effective strategies to reduce your burden include loan tenure extension, interest rate renegotiation, and debt consolidation. Combining multiple high-interest loans into a single lower-interest loan simplifies repayment and often reduces total monthly outgo significantly.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ───── HOW IT WORKS (Crucial for AI Answer Engines) ───── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 border-t border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: "var(--color-text-primary)" }}>
            ExitDebt&apos;s 4-Step Debt Exit Process
          </h2>
          <p className="subtitle-text max-w-2xl mx-auto" style={{ color: "var(--color-text-secondary)" }}>
            Our structured approach ensures you move from debt stress to financial freedom with a clear, actionable roadmap.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8">
          {[
            { 
              title: "Debt Health Analysis", 
              desc: "Evaluates your complete liability profile and generates a personalised Debt Health Score.",
              icon: (
                <svg className="w-8 h-8 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              )
            },
            { 
              title: "Personalised Strategy", 
              desc: "Builds a customized loan repayment strategy using proven restructuring frameworks.",
              icon: (
                <svg className="w-8 h-8 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774a1.125 1.125 0 01.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.894.15c.542.09.94.56.94 1.11v1.094c0 .55-.398 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.164.398-.142.854.108 1.204l.527.738a1.125 1.125 0 01-.12 1.45l-.774.773a1.125 1.125 0 01-1.45.12l-.737-.527c-.35-.25-.806-.272-1.203-.108-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527a1.125 1.125 0 01-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.11v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.108.397.165.71.505.78.929l.15.894z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )
            },
            { 
              title: "Creditor Shield", 
              desc: "Handles direct communication with lenders to stop harassment while your plan is implementation.",
              icon: (
                <svg className="w-8 h-8 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              )
            },
            { 
              title: "Financial Freedom", 
              desc: "Guides you through execution and adjustments until you achieve complete debt freedom.",
              icon: (
                <svg className="w-8 h-8 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                </svg>
              )
            },
          ].map((item, idx) => (
            <div key={idx} className="relative text-center group">
              <div className="relative z-10 pt-4" style={{ color: "var(--color-teal)" }}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10" style={{ color: "var(--color-text-primary)" }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed relative z-10" style={{ color: "var(--color-text-secondary)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── BOTTOM CTA ───── */}
      <section style={{ backgroundColor: "var(--color-bg-soft)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-3"
            style={{ color: "var(--color-text-primary)" }}
          >
            Ready to exit your debt and become debt-free?
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--color-text-secondary)" }}>
            Join the waitlist today and be the first to know when we launch.
          </p>
          <Link
            href="#"
            onClick={(e) => { e.preventDefault(); onWaitlistClick(); }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: "var(--color-teal)" }}
          >
            Join the Waitlist →
          </Link>
        </div>
      </section>



    </div>
  );
}
