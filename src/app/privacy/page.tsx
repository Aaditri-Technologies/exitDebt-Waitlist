import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "ExitDebt Privacy Policy — how we collect, use, and protect your personal information.",
};

const EFFECTIVE_DATE = "March 4, 2026";

export default function PrivacyPolicyPage() {
    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ backgroundColor: "var(--color-bg)" }}
        >
            <Navbar />

            <main className="flex-1 max-w-3xl mx-auto px-6 sm:px-8 py-16 sm:py-24">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-sm font-medium mb-10 transition-colors"
                    style={{ color: "var(--color-teal)" }}
                >
                    ← Back to Home
                </Link>

                <h1
                    className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2"
                    style={{ color: "var(--color-text-primary)" }}
                >
                    Privacy Policy
                </h1>
                <p
                    className="text-sm mb-10"
                    style={{ color: "var(--color-text-muted)" }}
                >
                    Effective date: {EFFECTIVE_DATE}
                </p>

                <div
                    className="space-y-8 text-base leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                >
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            1. Information We Collect
                        </h2>
                        <p>
                            When you join our waitlist, we collect the following information:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Full name</li>
                            <li>Mobile number</li>
                            <li>City / Place of residence</li>
                            <li>Approximate total debt amount</li>
                        </ul>
                        <p className="mt-3">
                            We also collect technical metadata such as IP addresses
                            (for rate limiting and abuse prevention only) and form
                            submission timestamps.
                        </p>
                    </section>

                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            2. How We Use Your Information
                        </h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>To manage your waitlist registration</li>
                            <li>To notify you when ExitDebt launches</li>
                            <li>To understand demand and plan our rollout</li>
                            <li>To prevent abuse, spam, and duplicate submissions</li>
                        </ul>
                    </section>

                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            3. Data Protection
                        </h2>
                        <p>
                            We implement industry-standard security measures including
                            input sanitization, rate limiting, and encrypted database
                            connections. We do not store passwords or perform credit
                            checks.
                        </p>
                    </section>

                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            4. Data Sharing
                        </h2>
                        <p>
                            We do not sell, trade, or share your personal information
                            with third parties. Your data is used solely for the
                            purposes described in this policy.
                        </p>
                    </section>

                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            5. Your Rights
                        </h2>
                        <p>
                            In accordance with the Digital Personal Data Protection Act
                            (DPDP), 2023, you have the right to:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Request access to your stored data</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Withdraw consent at any time</li>
                        </ul>
                        <p className="mt-3">
                            To exercise any of these rights, contact us at{" "}
                            <strong style={{ color: "var(--color-text-primary)" }}>
                                support@exitdebt.in
                            </strong>
                            .
                        </p>
                    </section>

                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            6. Cookies
                        </h2>
                        <p>
                            We use only essential cookies for session management and
                            admin authentication. We do not use tracking cookies or
                            third-party analytics.
                        </p>
                    </section>

                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            7. Changes to This Policy
                        </h2>
                        <p>
                            We may update this privacy policy from time to time. Any
                            changes will be posted on this page with an updated
                            effective date.
                        </p>
                    </section>

                    <div
                        className="rounded-xl p-6 mt-4"
                        style={{
                            backgroundColor: "var(--color-bg-soft)",
                            border: "1px solid var(--color-border)",
                        }}
                    >
                        <p
                            className="text-sm"
                            style={{ color: "var(--color-text-muted)" }}
                        >
                            Questions about this policy? Contact us at{" "}
                            <strong style={{ color: "var(--color-text-primary)" }}>
                                support@exitdebt.in
                            </strong>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
