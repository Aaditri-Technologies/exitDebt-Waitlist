import type { Metadata } from "next";
import HomePageContent from "@/components/HomePageContent";

export const metadata: Metadata = {
  title: "Debt Restructuring India | Exit Debt Faster | ExitDebt",
  description:
    "Struggling with credit card debt, EMIs, or personal loans in India? ExitDebt helps you restructure debt, reduce interest burden, and become debt-free faster.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ExitDebt – India's Smartest Debt Management Platform",
    description:
      "Join the waitlist. Understand, restructure, and exit your debt — at your terms. No CIBIL impact. Free to join.",
  },
};

export default function HomePage() {
  return <HomePageContent />;
}
