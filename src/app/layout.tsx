import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ExitDebt – Join the Waitlist",
  description:
    "Be the first to know when ExitDebt launches. Sign up for early access to India's smartest debt management platform.",
  keywords: [
    "debt",
    "waitlist",
    "financial health",
    "debt management",
    "India",
    "ExitDebt",
  ],
  openGraph: {
    title: "ExitDebt – Join the Waitlist",
    description:
      "Be the first to know when ExitDebt launches. Sign up for early access.",
    type: "website",
    locale: "en_IN",
    siteName: "ExitDebt",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased text-gray-900 bg-white">
        {children}
      </body>
    </html>
  );
}
