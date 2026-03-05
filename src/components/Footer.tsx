"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer
            style={{
                backgroundColor: "var(--color-bg-card)",
                borderTop: "1px solid var(--color-border)",
            }}
        >
            <div className="max-w-6xl mx-auto px-6 sm:px-8 py-6 sm:py-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div
                                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                                style={{ backgroundColor: "var(--color-teal)" }}
                            >
                                E
                            </div>
                            <span
                                className="text-base font-bold tracking-tight"
                                style={{ color: "var(--color-text-primary)" }}
                            >
                                ExitDebt
                            </span>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <p
                            className="text-xs font-semibold uppercase tracking-wider mb-4"
                            style={{ color: "var(--color-text-secondary)" }}
                        >
                            Company
                        </p>
                        <div className="space-y-2.5">
                            <Link
                                href="/about"
                                className="block text-sm transition-colors"
                                style={{ color: "var(--color-text-muted)" }}
                            >
                                About us
                            </Link>
                            <Link
                                href="/privacy"
                                className="block text-sm transition-colors"
                                style={{ color: "var(--color-text-muted)" }}
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="block text-sm transition-colors"
                                style={{ color: "var(--color-text-muted)" }}
                            >
                                Terms &amp; Conditions
                            </Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <p
                            className="text-xs font-semibold uppercase tracking-wider mb-4"
                            style={{ color: "var(--color-text-secondary)" }}
                        >
                            Get in touch
                        </p>
                        <div className="space-y-2.5">
                            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                                admin@exitdebt.in
                            </p>
                            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                                contact@exitdebt.in
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="mt-6 pt-6"
                    style={{ borderTop: "1px solid var(--color-border)" }}
                >
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                        © {new Date().getFullYear()} Aaditri Technologies. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
