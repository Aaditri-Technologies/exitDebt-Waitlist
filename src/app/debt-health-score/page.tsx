import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DebtHealthScoreContent from "@/components/DebtHealthScoreContent";

export const metadata: Metadata = {
  title: "Debt Health Score | Check Your Financial Health | ExitDebt",
  description:
    "Analyze your debt-to-income ratio and get a personalised financial health score. Find out if you qualify for RBI-compliant debt restructuring.",
  alternates: {
    canonical: "/debt-health-score",
  },
  openGraph: {
    title: "Debt Health Score — ExitDebt",
    description:
      "Get an instant diagnostic of your debt profile and see if you qualify for legal interest reduction.",
  },
};

export default function DebtHealthScorePage() {
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
            "applicationCategory": "FinanceApplication",
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
              { "@type": "ListItem", "position": 2, "name": "Debt Health Score", "item": "https://exitdebt.in/debt-health-score" },
            ],
          }),
        }}
      />

      <Navbar />
      <DebtHealthScoreContent />
      <Footer />
    </div>
  );
}
