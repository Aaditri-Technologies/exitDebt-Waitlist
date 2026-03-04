import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Learn about ExitDebt — India's smartest debt management platform helping millions understand, restructure, and become debt-free faster.",
};

export default function AboutPage() {
    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ backgroundColor: "var(--color-bg)" }}
        >
            <Navbar />

            <main className="flex-1 max-w-3xl mx-auto px-6 sm:px-8 py-16 sm:py-24">
                {/* Back link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-sm font-medium mb-10 transition-colors"
                    style={{ color: "var(--color-teal)" }}
                >
                    ← Back to Home
                </Link>

                <h1
                    className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6"
                    style={{ color: "var(--color-text-primary)" }}
                >
                    About ExitDebt
                </h1>

                <div
                    className="space-y-6 text-base leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                >
                    <p>
                        ExitDebt is India&apos;s smartest debt management platform, built
                        with a single mission:{" "}
                        <strong style={{ color: "var(--color-text-primary)" }}>
                            help every Indian exit their debt — on their own terms.
                        </strong>
                    </p>

                    <p>
                        We believe that debt doesn&apos;t have to be a lifelong burden. With
                        the right tools, insights, and guidance, anyone can take control of
                        their financial future. ExitDebt provides a comprehensive platform
                        to understand your debt landscape, explore restructuring options,
                        and create a personalized plan to become debt-free faster.
                    </p>

                    <h2
                        className="text-xl font-bold pt-4"
                        style={{ color: "var(--color-text-primary)" }}
                    >
                        Our Promise
                    </h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong style={{ color: "var(--color-text-primary)" }}>
                                Zero CIBIL impact
                            </strong>{" "}
                            — We never perform hard credit inquiries.
                        </li>
                        <li>
                            <strong style={{ color: "var(--color-text-primary)" }}>
                                100% free
                            </strong>{" "}
                            — No hidden charges, ever.
                        </li>
                        <li>
                            <strong style={{ color: "var(--color-text-primary)" }}>
                                Privacy first
                            </strong>{" "}
                            — Your data stays yours. We never sell or share personal
                            information.
                        </li>
                        <li>
                            <strong style={{ color: "var(--color-text-primary)" }}>
                                Built in India, for India
                            </strong>{" "}
                            — Designed around Indian financial systems and regulations.
                        </li>
                    </ul>

                    <h2
                        className="text-xl font-bold pt-4"
                        style={{ color: "var(--color-text-primary)" }}
                    >
                        The Team
                    </h2>
                    <p>
                        We&apos;re a team of fintech engineers, financial analysts, and
                        product designers based in Surat, India. We&apos;ve seen firsthand
                        how complex and overwhelming debt can be, and we&apos;re building
                        the tools we wish existed when we needed them.
                    </p>

                    <div
                        className="rounded-xl p-6 mt-8"
                        style={{
                            backgroundColor: "var(--color-bg-soft)",
                            border: "1px solid var(--color-border)",
                        }}
                    >
                        <p
                            className="text-sm"
                            style={{ color: "var(--color-text-muted)" }}
                        >
                            <strong style={{ color: "var(--color-text-primary)" }}>
                                ExitDebt Technologies Pvt. Ltd.
                            </strong>
                            <br />
                            Surat, Gujarat, India
                            <br />
                            support@exitdebt.in
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
