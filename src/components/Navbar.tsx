"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav
            className="sticky top-0 z-50 backdrop-blur-sm"
            style={{
                backgroundColor: "rgba(252,252,252,0.9)",
                boxShadow: "0 1px 0 var(--color-border)",
            }}
        >
            <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: "var(--color-teal)" }}
                    >
                        E
                    </div>
                    <span
                        className="text-lg font-bold tracking-tight"
                        style={{ color: "var(--color-text-primary)" }}
                    >
                        ExitDebt
                    </span>
                </Link>

                {/* Right */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/waitlist"
                        className="px-5 py-2 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
                        style={{ backgroundColor: "var(--color-teal)" }}
                    >
                        Join Waitlist →
                    </Link>
                </div>
            </div>
        </nav>
    );
}
