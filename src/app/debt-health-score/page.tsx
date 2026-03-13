"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function DebtHealthScore() {
  const [income, setIncome] = useState<number>(50000);
  const [totalEMI, setTotalEMI] = useState<number>(20000);
  const [totalDebt, setTotalDebt] = useState<number>(500000);
  const [showResult, setShowResult] = useState<boolean>(false);

  const calculateScore = () => {
    const dti = (totalEMI / income) * 100;
    const debtToIncomeRatio = totalDebt / (income * 12);
    
    let score = 100;
    if (dti > 30) score -= 20;
    if (dti > 45) score -= 30;
    if (dti > 60) score -= 40;
    if (debtToIncomeRatio > 1) score -= 10;
    
    return Math.max(score, 5);
  };

  const getAssessment = (score: number) => {
    if (score > 80) return { label: "Excellent", color: "text-green-500", desc: "Your debt is well-managed. Focus on building an investment portfolio." };
    if (score > 60) return { label: "Fair", color: "text-yellow-500", desc: "You are in the caution zone. Minor restructuring can free up significant cash." };
    if (score > 40) return { label: "Strained", color: "text-orange-500", desc: "High interest burden identified. You are a prime candidate for EMI restructuring." };
    return { label: "Critical", color: "text-red-500", desc: "Financial survival mode. Immediate RBI-compliant debt restructuring is required to prevent default." };
  };

  const score = calculateScore();
  const assessment = getAssessment(score);

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>
       {/* Schema for Tool */}
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "ExitDebt Health Score Engine",
            "url": "https://exitdebt.in/debt-health-score",
            "description": "Analyze your debt-to-income ratio and get a personalized financial health score.",
            "applicationCategory": "FinanceApplication"
          }),
        }}
      />

      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 tracking-tight" style={{ color: "var(--color-text-primary)" }}>
            Debt <span style={{ color: "var(--color-teal)" }}>Health Score</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Get an instant diagnostic of your debt profile and see if you qualify for legal interest reduction.
          </p>
        </div>

        {!showResult ? (
          <div className="bg-white p-8 sm:p-16 rounded-[4rem] border border-gray-100 shadow-2xl shadow-teal-900/5">
             <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                      <label className="block font-bold text-gray-700 mb-4">Monthly In-Hand Income (₹)</label>
                      <input 
                        type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))}
                        className="w-full p-4 rounded-2xl bg-gray-50 border-none font-bold text-lg"
                      />
                   </div>
                   <div>
                      <label className="block font-bold text-gray-700 mb-4">Total Monthly EMIs (₹)</label>
                      <input 
                        type="number" value={totalEMI} onChange={(e) => setTotalEMI(Number(e.target.value))}
                        className="w-full p-4 rounded-2xl bg-gray-50 border-none font-bold text-lg"
                      />
                   </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-4">Total Outstanding Debt (₹)</label>
                  <input 
                    type="number" value={totalDebt} onChange={(e) => setTotalDebt(Number(e.target.value))}
                    className="w-full p-4 rounded-2xl bg-gray-50 border-none font-bold text-lg"
                    placeholder="Include all credit cards and loans"
                  />
                  <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest font-medium">Approximate values are fine</p>
                </div>

                <button 
                  onClick={() => setShowResult(true)}
                  className="w-full py-6 bg-teal-500 hover:bg-teal-400 text-white font-black text-xl rounded-[2rem] transition-all shadow-xl shadow-teal-500/20 active:scale-[0.98]"
                >
                  Analyze My Debt Health →
                </button>
             </div>
          </div>
        ) : (
          <div className="animation-fade-in">
             <div className="bg-[#0a1917] rounded-[4rem] p-10 sm:p-20 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(20,184,166,0.15),transparent)]"></div>
                
                <div className="relative z-10">
                   <h3 className="text-teal-400 font-bold uppercase tracking-[0.3em] text-sm mb-12">Your Financial Diagnostic</h3>
                   
                   <div className="inline-flex items-center justify-center w-48 h-48 rounded-full border-8 border-white/5 relative mb-10">
                      <div className="text-7xl font-black tracking-tighter">{score}</div>
                      <div className="absolute -bottom-4 bg-teal-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Score</div>
                   </div>

                   <h2 className={`text-4xl font-extrabold mb-6 ${assessment.color}`}>{assessment.label}</h2>
                   <p className="text-teal-100/70 text-lg max-w-md mx-auto mb-12 leading-relaxed">
                     {assessment.desc}
                   </p>

                   <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-12">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                         <div className="text-[10px] text-gray-500 uppercase font-black mb-1">DTI Ratio</div>
                         <div className="font-bold text-teal-400">{Math.round((totalEMI/income)*100)}%</div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                         <div className="text-[10px] text-gray-500 uppercase font-black mb-1">Risk Level</div>
                         <div className="font-bold text-teal-400">{score < 50 ? 'High' : score < 80 ? 'Moderate' : 'Low'}</div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <Link href="/" className="block w-full py-5 bg-white text-[#0a1917] font-black rounded-2xl hover:bg-teal-50 transition-all shadow-2xl">
                        Get Detailed Restructuring Plan
                      </Link>
                      <button 
                        onClick={() => setShowResult(false)}
                        className="text-gray-500 text-sm font-bold hover:text-white transition-colors"
                      >
                        ← Recalculate with different numbers
                      </button>
                   </div>
                </div>
             </div>

             <div className="mt-12 p-10 bg-white border border-gray-100 rounded-[3rem] shadow-sm">
                <h4 className="font-bold mb-6 text-xl" style={{ color: "var(--color-text-primary)" }}>Why this score matters?</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <div className="font-bold text-teal-600 text-sm italic">For You:</div>
                      <p className="text-sm text-gray-500 m-0">It helps you understand if you are paying too much interest or if you are at risk of a CIBIL score collapse before it actually happens.</p>
                   </div>
                   <div className="space-y-2">
                      <div className="font-bold text-teal-600 text-sm italic">For Lenders:</div>
                      <p className="text-sm text-gray-500 m-0">Banks use similar ratios to decide whether to grant tenure extensions or moratoriums. We use this logic to build your case.</p>
                   </div>
                </div>
             </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
