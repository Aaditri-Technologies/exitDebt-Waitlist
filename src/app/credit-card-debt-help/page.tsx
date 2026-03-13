import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Credit Card Debt Help India | ExitDebt",
  description: "Struggling with high credit card interest? Get professional help to restructure your credit card debt, reduce interest, and exit debt faster.",
};

export default function CreditCardDebtHelp() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>
      <Navbar />
      
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <section className="text-center mb-16">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 leading-tight" style={{ color: "var(--color-text-primary)" }}>
            Tired of High Credit Card Interest? <br/>
            <span style={{ color: "var(--color-teal)" }}>We Can Help.</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto" style={{ color: "var(--color-text-secondary)" }}>
            Credit card debt in India can carry interest rates up to 42%. ExitDebt helps you restructure 
            these high-cost liabilities into manageable EMIs.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-3xl" style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
            <h2 className="text-xl font-bold mb-4">Reduce Monthly EMIs</h2>
            <p style={{ color: "var(--color-text-secondary)" }}>
              By extending tenure and lowering interest through restructuring, we help you bring your monthly outgoings down to a sustainable level.
            </p>
          </div>
          <div className="p-8 rounded-3xl" style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)" }}>
            <h2 className="text-xl font-bold mb-4">Protect Your CIBIL</h2>
            <p style={{ color: "var(--color-text-secondary)" }}>
              Unlike debt settlement, structured restructuring aims to fulfill your obligations in a way that minimizes damage to your credit report.
            </p>
          </div>
        </div>

        <section className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-teal-900/5 border border-gray-100 mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">How to Get Out of Credit Card Debt</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-bold mb-1">Stop Using the Cards</h3>
                <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>Immediate freeze on new spending is the first step to recovery.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold mb-1">Consolidate Outstanding Balances</h3>
                <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>Identify all balances across multiple banks and interest rates.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-bold mb-1">Request EMI Conversion</h3>
                <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>Ask your bank to convert the total amount into a low-interest EMI plan.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-bold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "var(--color-teal)" }}
          >
            Join the Waitlist for Help →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
