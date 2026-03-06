import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "ExitDebt Privacy Policy — how Aaditri Technologies collects, uses, stores, and shares your personal information.",
};

const LAST_UPDATED = "March 2026";

export default function PrivacyPolicyPage() {
    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ backgroundColor: "var(--color-bg)" }}
        >
            <Navbar />

            <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-16">
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
                    Last Updated: {LAST_UPDATED}
                </p>

                <div
                    className="space-y-8 text-base leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                >
                    {/* Intro */}
                    <p>
                        This Privacy Policy describes how Aaditri Technologies
                        (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or
                        &quot;our&quot;) collects, uses, stores, and shares
                        information in connection with your use of our website,
                        applications, and related services (collectively, the
                        &quot;Services&quot;), including the ExitDebt platform.
                    </p>
                    <p>
                        By accessing or using our Services, you agree to the
                        collection and use of information in accordance with this
                        Policy. If you do not agree, please do not use our
                        Services.
                    </p>

                    {/* Section 1 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            1. Information We Collect
                        </h2>

                        <h3
                            className="text-base font-semibold mt-4 mb-2"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            1.1 Information You Provide
                        </h3>
                        <p>
                            We collect information that you voluntarily provide
                            when you interact with our Services, including but
                            not limited to:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Name</li>
                            <li>Email address</li>
                            <li>Phone number</li>
                            <li>
                                Any other information you choose to provide
                            </li>
                        </ul>

                        <h3
                            className="text-base font-semibold mt-4 mb-2"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            1.2 Information Collected Automatically
                        </h3>
                        <p>
                            When you access our Services, we may automatically
                            collect certain information, including:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>IP address</li>
                            <li>Browser type and version</li>
                            <li>Operating system</li>
                            <li>Device identifiers</li>
                            <li>Pages visited and time spent</li>
                            <li>Referring URLs</li>
                            <li>
                                Cookies and similar tracking technologies
                            </li>
                        </ul>

                        <h3
                            className="text-base font-semibold mt-4 mb-2"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            1.3 Information from Third Parties
                        </h3>
                        <p>
                            We may receive information about you from
                            third-party sources, including credit information
                            companies, financial data providers, analytics
                            providers, advertising networks, identity
                            verification services, and publicly available
                            sources, and combine it with information we collect
                            from you.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            2. How We Use Your Information
                        </h2>
                        <p>
                            We may use the information we collect for the
                            following purposes:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>
                                To provide, maintain, and improve our Services
                            </li>
                            <li>
                                To communicate with you, including sending
                                service-related notices, updates, promotional
                                materials, and marketing communications
                            </li>
                            <li>To personalize your experience</li>
                            <li>
                                To process transactions and manage your
                                relationship with us
                            </li>
                            <li>
                                To conduct research, analytics, and product
                                development
                            </li>
                            <li>
                                To enforce our terms, policies, and legal rights
                            </li>
                            <li>
                                To comply with applicable laws, regulations, and
                                legal processes
                            </li>
                            <li>
                                To detect, prevent, and address fraud, security
                                issues, and technical problems
                            </li>
                            <li>
                                For any other purpose with your consent or as
                                permitted by law
                            </li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            3. How We Share Your Information
                        </h2>
                        <p>
                            We may share your information in the following
                            circumstances:
                        </p>
                        <ul className="list-none pl-0 mt-2 space-y-3">
                            <li>
                                <strong
                                    style={{
                                        color: "var(--color-text-primary)",
                                    }}
                                >
                                    Service Providers:
                                </strong>{" "}
                                With third-party vendors, consultants, and
                                service providers who perform services on our
                                behalf, including hosting, analytics, email
                                delivery, messaging, customer support, and
                                payment processing.
                            </li>
                            <li>
                                <strong
                                    style={{
                                        color: "var(--color-text-primary)",
                                    }}
                                >
                                    Business Partners:
                                </strong>{" "}
                                With our business partners, affiliates, and
                                collaborators in connection with providing and
                                improving our Services.
                            </li>
                            <li>
                                <strong
                                    style={{
                                        color: "var(--color-text-primary)",
                                    }}
                                >
                                    Legal Requirements:
                                </strong>{" "}
                                When required by law, regulation, legal process,
                                or governmental request, or when we believe
                                disclosure is necessary to protect our rights,
                                property, or safety, or that of our users or the
                                public.
                            </li>
                            <li>
                                <strong
                                    style={{
                                        color: "var(--color-text-primary)",
                                    }}
                                >
                                    Business Transfers:
                                </strong>{" "}
                                In connection with any merger, acquisition,
                                reorganization, sale of assets, or bankruptcy,
                                your information may be transferred as a
                                business asset.
                            </li>
                            <li>
                                <strong
                                    style={{
                                        color: "var(--color-text-primary)",
                                    }}
                                >
                                    With Your Consent:
                                </strong>{" "}
                                When you have given us explicit or implied
                                consent to share your information.
                            </li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            4. Cookies and Tracking Technologies
                        </h2>
                        <p>
                            We use cookies and similar technologies to collect
                            usage information, remember your preferences, and
                            improve our Services. You can manage cookie
                            preferences through your browser settings. Disabling
                            cookies may affect the functionality of our
                            Services.
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            5. Data Retention
                        </h2>
                        <p>
                            We retain your information for as long as necessary
                            to fulfill the purposes described in this Policy, or
                            as required by law. When your information is no
                            longer needed, we will delete or anonymize it in
                            accordance with our internal data retention
                            policies.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            6. Data Security
                        </h2>
                        <p>
                            We implement reasonable administrative, technical,
                            and physical safeguards to protect your information
                            against unauthorized access, alteration, disclosure,
                            or destruction. However, no method of transmission
                            or storage is 100% secure, and we cannot guarantee
                            absolute security.
                        </p>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            7. Your Rights
                        </h2>
                        <p>
                            Subject to applicable law, including the Digital
                            Personal Data Protection Act, 2023, you may have the
                            following rights regarding your personal data:
                        </p>
                        <ul className="list-none pl-0 mt-2 space-y-3">
                            <li>
                                <strong
                                    style={{
                                        color: "var(--color-text-primary)",
                                    }}
                                >
                                    Access:
                                </strong>{" "}
                                Request access to the personal data we hold
                                about you.
                            </li>
                            <li>
                                <strong
                                    style={{
                                        color: "var(--color-text-primary)",
                                    }}
                                >
                                    Correction:
                                </strong>{" "}
                                Request correction of inaccurate or incomplete
                                data.
                            </li>
                            <li>
                                <strong
                                    style={{
                                        color: "var(--color-text-primary)",
                                    }}
                                >
                                    Erasure:
                                </strong>{" "}
                                Request deletion of your personal data, subject
                                to legal obligations.
                            </li>
                            <li>
                                <strong
                                    style={{
                                        color: "var(--color-text-primary)",
                                    }}
                                >
                                    Withdraw Consent:
                                </strong>{" "}
                                Withdraw consent where processing is based on
                                consent, which may affect your ability to use
                                the Services.
                            </li>
                            <li>
                                <strong
                                    style={{
                                        color: "var(--color-text-primary)",
                                    }}
                                >
                                    Grievance Redressal:
                                </strong>{" "}
                                Lodge a complaint with us or the appropriate
                                authority.
                            </li>
                            <li>
                                <strong
                                    style={{
                                        color: "var(--color-text-primary)",
                                    }}
                                >
                                    Nominate:
                                </strong>{" "}
                                Nominate a representative to exercise your
                                rights on your behalf, as provided under
                                applicable law.
                            </li>
                        </ul>
                        <p className="mt-3">
                            To exercise any of these rights, contact us at the
                            details provided in Section 11.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            8. Children
                        </h2>
                        <p>
                            Our Services are not directed to individuals under
                            the age of 18. We do not knowingly collect personal
                            data from minors. If we become aware that we have
                            collected information from a minor, we will take
                            steps to delete it.
                        </p>
                    </section>

                    {/* Section 9 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            9. Third-Party Links
                        </h2>
                        <p>
                            Our Services may contain links to third-party
                            websites or services. We are not responsible for the
                            privacy practices or content of such third parties.
                            We encourage you to read the privacy policies of any
                            third-party services you visit.
                        </p>
                    </section>

                    {/* Section 10 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            10. Changes to This Policy
                        </h2>
                        <p>
                            We may update this Privacy Policy from time to time.
                            We will notify you of material changes by posting
                            the updated Policy on our website with a revised
                            &quot;Last Updated&quot; date. Your continued use of
                            the Services after any changes constitutes your
                            acceptance of the updated Policy.
                        </p>
                    </section>

                    {/* Section 11 - Contact */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            11. Contact Us
                        </h2>
                        <p className="mb-4">
                            If you have questions or concerns about this Policy,
                            or wish to exercise your rights, please contact us:
                        </p>
                        <div
                            className="rounded-xl overflow-hidden"
                            style={{
                                border: "1px solid var(--color-border)",
                            }}
                        >
                            <table className="w-full text-sm">
                                <tbody>
                                    <tr
                                        style={{
                                            borderBottom:
                                                "1px solid var(--color-border)",
                                        }}
                                    >
                                        <td
                                            className="px-4 py-3 font-semibold whitespace-nowrap"
                                            style={{
                                                color: "var(--color-text-primary)",
                                                backgroundColor:
                                                    "var(--color-bg-soft)",
                                                width: "40%",
                                            }}
                                        >
                                            Email
                                        </td>
                                        <td className="px-4 py-3">
                                            admin@exitdebt.in
                                        </td>
                                    </tr>
                                    <tr
                                        style={{
                                            borderBottom:
                                                "1px solid var(--color-border)",
                                        }}
                                    >
                                        <td
                                            className="px-4 py-3 font-semibold whitespace-nowrap"
                                            style={{
                                                color: "var(--color-text-primary)",
                                                backgroundColor:
                                                    "var(--color-bg-soft)",
                                            }}
                                        >
                                            Grievance Officer
                                        </td>
                                        <td className="px-4 py-3">
                                            Kumar R Anand
                                        </td>
                                    </tr>
                                    <tr
                                        style={{
                                            borderBottom:
                                                "1px solid var(--color-border)",
                                        }}
                                    >
                                        <td
                                            className="px-4 py-3 font-semibold whitespace-nowrap"
                                            style={{
                                                color: "var(--color-text-primary)",
                                                backgroundColor:
                                                    "var(--color-bg-soft)",
                                            }}
                                        >
                                            Grievance Email
                                        </td>
                                        <td className="px-4 py-3">
                                            contact@exitdebt.in
                                        </td>
                                    </tr>
                                    <tr
                                        style={{
                                            borderBottom:
                                                "1px solid var(--color-border)",
                                        }}
                                    >
                                        <td
                                            className="px-4 py-3 font-semibold whitespace-nowrap"
                                            style={{
                                                color: "var(--color-text-primary)",
                                                backgroundColor:
                                                    "var(--color-bg-soft)",
                                            }}
                                        >
                                            Response Time
                                        </td>
                                        <td className="px-4 py-3">
                                            Within 30 days
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="px-4 py-3 font-semibold whitespace-nowrap"
                                            style={{
                                                color: "var(--color-text-primary)",
                                                backgroundColor:
                                                    "var(--color-bg-soft)",
                                            }}
                                        >
                                            Address
                                        </td>
                                        <td className="px-4 py-3">
                                            Surat, Gujarat, India
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
