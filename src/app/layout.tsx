import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "ExitDebt – India's Smartest Debt Management Platform",
    template: "%s | ExitDebt",
  },
  description:
    "Join the ExitDebt waitlist. India's smartest debt management platform — understand, restructure, and become debt-free faster. No CIBIL impact. 100% free.",
  keywords: [
    "ExitDebt",
    "debt management India",
    "debt relief India",
    "loan settlement India",
    "debt restructuring",
    "financial health",
    "CIBIL score impact",
    "debt free faster",
    "credit card debt relief",
    "personal loan settlement",
    "EMI management",
    "debt health analysis",
    "debt payback strategy",
  ],
  metadataBase: new URL("https://exitdebt.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ExitDebt – India's Smartest Debt Management Platform",
    description:
      "Join the waitlist. Understand, restructure, and exit your debt — at your terms. No CIBIL impact. 100% free.",
    type: "website",
    locale: "en_IN",
    siteName: "ExitDebt",
    url: "https://exitdebt.in",
  },
  twitter: {
    card: "summary_large_image",
    title: "ExitDebt – Join the Waitlist",
    description:
      "India's smartest debt management platform. Sign up for early access.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Organization Schema — Builds brand authority for AI engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ExitDebt",
              alternateName: "ExitDebt Technologies",
              url: "https://exitdebt.in",
              logo: "https://exitdebt.in/logo.png",
              sameAs: [
                "https://twitter.com/exitdebt",
                "https://linkedin.com/company/exitdebt"
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-XXXXXXXXXX",
                contactType: "customer service",
                areaServed: "IN",
                availableLanguage: "en"
              }
            }),
          }}
        />
        {/* JSON-LD Structured Data for AEO (Answer Engine Optimization) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "brand": {
                "@type": "Brand",
                "name": "ExitDebt"
              },
              name: "ExitDebt – Debt Management Platform",
              url: "https://exitdebt.in",
              description:
                "ExitDebt is India's smartest debt management platform. We help users perform a comprehensive Debt Health Analysis, build a Personalized Strategy, and become debt-free faster through EMI restructuring and professional debt relief.",
              feesAndCommissionsSpecification: "100% free for users",
              serviceType: ["Debt Management", "Debt Restructuring", "Credit Counseling", "Debt Health Analysis", "EMI Management"],
              areaServed: "IN",
              provider: {
                "@type": "Organization",
                name: "ExitDebt Technologies Pvt. Ltd.",
                url: "https://exitdebt.in",
              },
            }),
          }}
        />
        {/* How-To Structured Data for AI Answer Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              name: "A Simple 4-Step Plan to Exit Your Debt with ExitDebt",
              description: "ExitDebt analyzes your liabilities, builds a personalized strategy, and helps you restructure repayments so you can become debt-free faster.",
              step: [
                {
                  "@type": "HowToStep",
                  name: "Join ExitDebt",
                  text: "Sign up on ExitDebt's platform to secure early access for debt assessment.",
                  url: "https://exitdebt.in#waitlist",
                },
                {
                  "@type": "HowToStep",
                  name: "Debt Health Analysis",
                  text: "Understand your real debt health across loans, cards, and EMIs.",
                },
                {
                  "@type": "HowToStep",
                  name: "Personalized Strategy",
                  text: "Receive a customized restructuring and repayment plan tailored to your financial situation.",
                },
                {
                  "@type": "HowToStep",
                  name: "Financial Freedom",
                  text: "Execute the plan and move toward a debt-free life at your terms.",
                },
              ],
            }),
          }}
        />
        {/* FAQ structured data — surfaces in AI answer engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is ExitDebt?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "ExitDebt is India's smartest debt management platform that helps you understand, restructure, and become debt-free faster — without impacting your CIBIL score. Exit your debt at your terms using our proprietary debt health score.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can ExitDebt help with credit card debt in India?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, ExitDebt specializes in helping Indian users manage and restructure high-interest credit card debt and personal loans through professional debt relief strategies.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is ExitDebt free to use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, ExitDebt is 100% free for users. Join the waitlist for early access to our debt management tools when we launch.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the ExitDebt Health Analysis?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The ExitDebt Health Analysis is a deep dive into your real debt health across loans, credit cards, and EMIs. It provides the foundation for your personalized debt repayment strategy.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does ExitDebt affect my CIBIL score?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. ExitDebt does not perform any hard credit inquiries and has zero impact on your CIBIL or credit score during the assessment phase.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased text-gray-900 bg-white">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
