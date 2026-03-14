import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaitlistContent from "@/components/WaitlistContent";

export const metadata: Metadata = {
  title: "Join the Waitlist | ExitDebt",
  description:
    "Sign up for early access to ExitDebt — India's smartest debt management platform. Get a personalised debt restructuring strategy before anyone else.",
  alternates: {
    canonical: "/waitlist",
  },
  openGraph: {
    title: "Join the ExitDebt Waitlist",
    description:
      "Be among the first to access India's structured debt management platform. Free to join.",
  },
};

export default function WaitlistPage() {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-bg)" }}>
            <Navbar />
            <WaitlistContent />
            <Footer />
        </div>
    );
}
