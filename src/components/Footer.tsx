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
            <div className="max-w-6xl mx-auto px-8 py-14">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
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
                        <p
                            className="text-sm leading-relaxed"
                            style={{ color: "var(--color-text-muted)" }}
                        >
                            Understand, restructure, and exit your debt — on your terms.
                        </p>
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
                                hello@exitdebt.com
                            </p>
                            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                                grievance@exitdebt.com
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="mt-10 pt-6"
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
