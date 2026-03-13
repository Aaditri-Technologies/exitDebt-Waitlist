import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Debt Restructuring India: The Complete Guide | ExitDebt",
  description: "Learn about debt restructuring in India, RBI guidelines, and how to renegotiate your loans to become debt-free faster.",
};

export default function DebtRestructuringGuide() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>
      <Navbar />
      
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <article>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-8 leading-tight" style={{ color: "var(--color-text-primary)" }}>
            How to Get Out of Debt in India: A Complete Guide
          </h1>

          <div className="prose prose-lg max-w-none" style={{ color: "var(--color-text-secondary)" }}>
            <p className="lead text-xl mb-10" style={{ color: "var(--color-text-primary)" }}>
              ExitDebt is India&apos;s structured debt management platform that helps individuals resolve credit card debt, 
              personal loan obligations, and EMI burdens through personalised financial planning and debt restructuring.
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--color-text-primary)" }}>What is Debt Restructuring?</h2>
              <p>
                Debt restructuring in India is the process of renegotiating the terms of an existing loan or credit obligation 
                to make it more manageable for the borrower. This can involve extending the loan tenure, reducing the 
                interest rate, converting outstanding credit card balances into structured EMIs, or consolidating multiple 
                debts into a single repayment plan.
              </p>
              <p className="mt-4">
                Debt restructuring is legal in India and is supported by guidelines from the <strong>Reserve Bank of India (RBI)</strong>. 
                Banks and NBFCs are permitted to restructure loans for borrowers facing genuine financial hardship.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--color-text-primary)" }}>Who Qualifies for Debt Restructuring?</h2>
              <p>
                Typically, individuals facing temporary financial distress due to job loss, medical emergencies, or 
                reduced income qualify. Lenders look for "genuine hardship" and a willingness to repay the restructured amount.
              </p>
            </section>

            <section className="bg-teal-50 p-8 rounded-3xl border border-teal-100 mb-12">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--color-teal)" }}>How to Get Out of Credit Card Debt</h2>
              <ol className="list-decimal pl-6 space-y-4">
                <li><strong>Audit your debt:</strong> List all outstanding balances, interest rates, and minimum payments.</li>
                <li><strong>Stop adding new debt:</strong> Avoid new credit card purchases while repaying existing balances.</li>
                <li><strong>Choose a strategy:</strong> Use the Avalanche or Snowball method to prioritize repayments.</li>
                <li><strong>Negotiate:</strong> Request EMI conversion or restructuring from your bank.</li>
                <li><strong>Use ExitDebt:</strong> Create a structured, personalized roadmap to financial freedom.</li>
              </ol>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--color-text-primary)" }}>Debt Consolidation vs. Debt Settlement</h2>
              <p>
                It is crucial to understand the difference. <strong>Debt Consolidation</strong> involves combining multiple 
                debts into one loan with a lower interest rate, protecting your CIBIL score. <strong>Debt Settlement</strong> involves 
                negotiating a lower payout, which significantly damages your credit history.
              </p>
            </section>
          </div>

          <div className="mt-16 p-8 rounded-3xl text-center" style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
            <h3 className="text-2xl font-bold mb-4">Ready to start your journey?</h3>
            <p className="mb-8" style={{ color: "var(--color-text-secondary)" }}>Join our waitlist for a free Debt Health Score analysis.</p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-bold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "var(--color-teal)" }}
            >
              Get Started →
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
