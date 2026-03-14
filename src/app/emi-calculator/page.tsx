import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EMICalculatorContent from "@/components/EMICalculatorContent";

export const metadata: Metadata = {
  title: "EMI Savings Calculator | Restructure Loans | ExitDebt",
  description:
    "Calculate how much you can save per month by restructuring your loan EMIs. Free EMI savings calculator based on RBI restructuring guidelines.",
  alternates: {
    canonical: "/emi-calculator",
  },
  openGraph: {
    title: "EMI Savings Calculator — ExitDebt",
    description:
      "See exactly how much monthly cash you can free up by restructuring your current loans under RBI guidelines.",
  },
};

export default function EMICalculatorPage() {
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
            "operatingSystem": "All",
          }),
        }}
      />
      {/* BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://exitdebt.in" },
              { "@type": "ListItem", "position": 2, "name": "EMI Savings Calculator", "item": "https://exitdebt.in/emi-calculator" },
            ],
          }),
        }}
      />

      <Navbar />
      <EMICalculatorContent />
      <Footer />
    </div>
  );
}
