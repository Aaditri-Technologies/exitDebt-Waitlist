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
    "debt management India",
    "debt relief",
    "loan settlement",
    "debt restructuring",
    "financial health",
    "CIBIL score",
    "debt free",
    "ExitDebt",
    "waitlist",
  ],
  metadataBase: new URL("https://exitdebt.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ExitDebt – India's Smartest Debt Management Platform",
    description:
      "Join the waitlist. Understand, restructure, and exit your debt — on your terms. No CIBIL impact. 100% free.",
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
        {/* JSON-LD Structured Data for AEO (Answer Engine Optimization) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "ExitDebt",
              url: "https://exitdebt.in",
              description:
                "India's smartest debt management platform. Understand, restructure, and become debt-free faster.",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "INR",
              },
              creator: {
                "@type": "Organization",
                name: "ExitDebt Technologies Pvt. Ltd.",
                url: "https://exitdebt.in",
              },
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
                    text: "ExitDebt is India's smartest debt management platform that helps you understand, restructure, and become debt-free faster — without impacting your CIBIL score.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is ExitDebt free to use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, ExitDebt is 100% free for users. Join the waitlist for early access when we launch.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does ExitDebt affect my CIBIL score?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. ExitDebt does not perform any hard credit inquiries and has zero impact on your CIBIL or credit score.",
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
