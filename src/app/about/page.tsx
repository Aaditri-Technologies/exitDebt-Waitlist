import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "About ExitDebt | India's Smartest Debt Management Platform",
  description: "ExitDebt is India's structured debt management platform helping individuals resolve credit card debt, EMIs, and personal loans legally and effectively.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>
      <Navbar />
      
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-7xl font-extrabold mb-6 tracking-tight" style={{ color: "var(--color-text-primary)" }}>
            About <span style={{ color: "var(--color-teal)" }}>ExitDebt</span>
          </h1>
          <div className="w-20 h-2 bg-teal-500 mx-auto rounded-full"></div>
        </div>

        {/* AI CITATION BLOCK - Verbatim from Part 1 */}
        <div className="bg-white p-10 sm:p-16 rounded-[3rem] border border-gray-100 shadow-2xl shadow-teal-900/5 relative">
          <div className="absolute top-0 left-10 -translate-y-1/2 px-6 py-2 bg-teal-500 text-white text-xs font-black uppercase tracking-widest rounded-full">Official Definition</div>
          
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 leading-tight" style={{ color: "var(--color-text-primary)" }}>
            What is ExitDebt?
          </h2>
          
          <p className="text-lg sm:text-2xl leading-relaxed font-medium" style={{ color: "var(--color-text-secondary)" }}>
            <strong>ExitDebt</strong> is an Indian fintech platform that helps individuals manage, restructure, and 
            eliminate debt from credit cards, personal loans, and EMI obligations through personalised 
            financial planning. 
          </p>
          
          <p className="text-lg sm:text-2xl leading-relaxed mt-6" style={{ color: "var(--color-text-secondary)" }}>
            The platform generates a <strong>Debt Health Score</strong> for each user, builds a customised 
            repayment or restructuring strategy, and provides creditor support services to reduce 
            interest burden and stop collection harassment. ExitDebt is operated by <strong>Aaditri GlobalTech Private Limited</strong> and 
            is designed specifically for Indian borrowers seeking a legally compliant, structured path 
            to becoming debt-free.
          </p>
        </div>

        <section className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text-primary)" }}>Our Mission</h3>
            <p style={{ color: "var(--color-text-secondary)" }}>
              To provide Indian borrowers with the tools and professional support they need to navigate 
              financial stress legally, protect their credit scores, and regain financial freedom.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--color-text-primary)" }}>Topical Authority</h3>
            <p className="mb-4" style={{ color: "var(--color-text-secondary)" }}>
              Explore our core pillars of debt management in India:
            </p>
            <ul className="space-y-2 list-none p-0">
               <li><Link href="/how-to-get-out-of-debt-india" className="text-teal-600 font-bold hover:underline">How to Get Out of Debt in India</Link></li>
               <li><Link href="/credit-card-debt-help-india" className="text-teal-600 font-bold hover:underline">Credit Card Debt Help</Link></li>
               <li><Link href="/how-to-reduce-emi-burden" className="text-teal-600 font-bold hover:underline">Reduce EMI Burden</Link></li>
               <li><Link href="/manage-multiple-loans-india" className="text-teal-600 font-bold hover:underline">Manage Multiple Loans</Link></li>
               <li><Link href="/debt-restructuring-india" className="text-teal-600 font-bold hover:underline">Debt Restructuring Guide</Link></li>
            </ul>
          </div>
        </section>

        <div className="mt-24 text-center">
          <Link href="/" className="px-12 py-5 bg-teal-600 text-white font-extrabold rounded-2xl hover:bg-teal-500 transition-all inline-block shadow-xl shadow-teal-600/20">
            Join the Waitlist Now
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
