"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(15);
  const [tenure, setTenure] = useState<number>(3);
  const [newTenure, setNewTenure] = useState<number>(5);
  
  const calculateEMI = (p: number, r: number, t: number) => {
    const monthlyRate = r / (12 * 100);
    const months = t * 12;
    if (monthlyRate === 0) return p / months;
    return (p * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  };

  const cEMI = calculateEMI(loanAmount, interestRate, tenure);
  const rEMI = calculateEMI(loanAmount, interestRate, newTenure);

  const currentEMI = Math.round(cEMI);
  const restructuredEMI = Math.round(rEMI);
  const monthlySavings = Math.round(cEMI - rEMI);


  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>
       {/* Schema for Tool */}
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "ExitDebt EMI Savings Calculator",
            "url": "https://exitdebt.in/emi-calculator",
            "description": "Calculate how much you can save per month by restructuring your loan EMIs through tenure extension.",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "All"
          }),
        }}
      />

      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight" style={{ color: "var(--color-text-primary)" }}>
            EMI <span style={{ color: "var(--color-teal)" }}>Savings Calculator</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            See exactly how much monthly cash you can free up by restructuring your current loans under RBI guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* INPUTS CARD */}
          <div className="bg-white p-8 sm:p-12 rounded-[3.5rem] border border-gray-100 shadow-2xl shadow-teal-900/5">
             <div className="space-y-10">
                <div>
                  <div className="flex justify-between mb-4">
                    <label className="font-bold text-gray-700">Loan Amount (₹)</label>
                    <span className="font-black text-teal-600">₹{loanAmount.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" min="50000" max="5000000" step="50000" 
                    value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-teal-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-4">
                    <label className="font-bold text-gray-700">Interest Rate (%)</label>
                    <span className="font-black text-teal-600">{interestRate}%</span>
                  </div>
                  <input 
                    type="range" min="8" max="42" step="0.5" 
                    value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-8">
                   <div>
                     <label className="block font-bold text-gray-700 mb-4">Current Tenure (Yrs)</label>
                     <select 
                      value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full p-4 rounded-2xl bg-gray-50 border-none font-bold text-gray-700 focus:ring-2 focus:ring-teal-500"
                     >
                       {[1,2,3,4,5,7,10].map(v => <option key={v} value={v}>{v} Years</option>)}
                     </select>
                   </div>
                   <div>
                     <label className="block font-bold text-teal-600 mb-4">New Tenure (Yrs)</label>
                     <select 
                      value={newTenure} onChange={(e) => setNewTenure(Number(e.target.value))}
                      className="w-full p-4 rounded-2xl bg-teal-50 border-none font-black text-teal-700 focus:ring-2 focus:ring-teal-500"
                     >
                       {[2,3,4,5,7,10,12,15].map(v => <option key={v} value={v}>{v} Years</option>)}
                     </select>
                   </div>
                </div>
             </div>
          </div>

          {/* RESULTS CARD */}
          <div className="sticky top-24">
             <div className="bg-[#0a1917] rounded-[3.5rem] p-10 sm:p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                
                <div className="relative z-10">
                   <h3 className="text-teal-400 font-bold uppercase tracking-widest text-sm mb-10">Potential Monthly Savings</h3>
                   
                   <div className="mb-12">
                     <div className="text-6xl sm:text-7xl font-black mb-2 tracking-tighter">
                       ₹{monthlySavings.toLocaleString()}
                     </div>
                     <p className="text-teal-100/50 font-medium italic">Cash freed up every single month</p>
                   </div>

                   <div className="space-y-4 pt-8 border-t border-white/5">
                      <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                         <span className="text-gray-400 text-sm">Old Monthly EMI</span>
                         <span className="font-bold">₹{currentEMI.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center bg-teal-500/10 p-4 rounded-2xl">
                         <span className="text-teal-400 text-sm">New Monthly EMI</span>
                         <span className="font-bold text-teal-400">₹{restructuredEMI.toLocaleString()}</span>
                      </div>
                   </div>

                   <div className="mt-12">
                     <Link href="/" className="w-full block py-5 px-8 bg-teal-500 hover:bg-teal-400 text-white font-black text-center rounded-2xl transition-all shadow-xl shadow-teal-500/20 active:scale-95">
                       Get This Plan Now →
                     </Link>
                     <p className="text-center text-[10px] text-gray-500 mt-6 uppercase tracking-[0.2em]">Based on standard RBI restructuring guidelines</p>
                   </div>
                </div>
             </div>

             <div className="mt-8 p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  Why Restructure?
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed m-0">
                  By extending your tenure, you lower the immediate EMI burden, preventing defaults and protecting your <strong>CIBIL score</strong>. 
                  ExitDebt helps you negotiate these terms formally with your lenders.
                </p>
             </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
