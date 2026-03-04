import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Terms of Service",
    description:
        "ExitDebt Terms of Service — the rules and guidelines for using our platform.",
};

const EFFECTIVE_DATE = "March 4, 2026";

export default function TermsPage() {
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
                    Terms of Service
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
                            1. Acceptance of Terms
                        </h2>
                        <p>
                            By accessing or using ExitDebt (&quot;the Platform&quot;),
                            you agree to be bound by these Terms of Service. If you do
                            not agree to these terms, please do not use the Platform.
                        </p>
                    </section>

                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            2. Description of Service
                        </h2>
                        <p>
                            ExitDebt is a debt management platform that helps users
                            understand, restructure, and plan their path to becoming
                            debt-free. The Platform is currently in pre-launch phase
                            and accepts waitlist registrations.
                        </p>
                    </section>

                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            3. Eligibility
                        </h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>You must be at least 18 years of age.</li>
                            <li>You must be a resident of India.</li>
                            <li>
                                You must provide accurate and truthful information during
                                registration.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            4. User Responsibilities
                        </h2>
                        <p>You agree to:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Provide accurate personal and financial information.</li>
                            <li>Not misuse the Platform for fraudulent purposes.</li>
                            <li>Not attempt to access restricted areas of the Platform.</li>
                            <li>
                                Not submit automated or bot-generated registrations.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            5. Disclaimer
                        </h2>
                        <p>
                            ExitDebt is a debt management tool and{" "}
                            <strong style={{ color: "var(--color-text-primary)" }}>
                                does not provide financial, legal, or tax advice
                            </strong>
                            . The information provided through the Platform is for
                            educational and informational purposes only. Always consult
                            a qualified financial advisor before making decisions about
                            your debt.
                        </p>
                    </section>

                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            6. Limitation of Liability
                        </h2>
                        <p>
                            ExitDebt Technologies Pvt. Ltd. shall not be liable for any
                            direct, indirect, incidental, or consequential damages
                            arising from your use of the Platform. The Platform is
                            provided &quot;as is&quot; without warranties of any kind.
                        </p>
                    </section>

                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            7. Intellectual Property
                        </h2>
                        <p>
                            All content, branding, and code on the Platform are the
                            intellectual property of ExitDebt Technologies Pvt. Ltd.
                            and may not be reproduced without written permission.
                        </p>
                    </section>

                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            8. Governing Law
                        </h2>
                        <p>
                            These Terms shall be governed by and construed in accordance
                            with the laws of India. Any disputes shall be subject to the
                            exclusive jurisdiction of the courts in Surat, Gujarat.
                        </p>
                    </section>

                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            9. Changes to These Terms
                        </h2>
                        <p>
                            We reserve the right to modify these terms at any time.
                            Changes will be posted on this page with an updated
                            effective date. Continued use of the Platform constitutes
                            acceptance of the revised terms.
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
                            Questions about these terms? Contact us at{" "}
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
