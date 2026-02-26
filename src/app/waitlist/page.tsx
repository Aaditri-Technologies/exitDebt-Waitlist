"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaitlistContent from "@/components/WaitlistContent";

export default function WaitlistPage() {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-bg)" }}>
            <Navbar />
            <WaitlistContent />
            <Footer />
        </div>
    );
}
