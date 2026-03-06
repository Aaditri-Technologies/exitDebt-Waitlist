import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Terms & Conditions",
    description:
        "ExitDebt Terms & Conditions — the rules and guidelines for using our platform and services.",
};

const LAST_UPDATED = "March 2026";

export default function TermsPage() {
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
                    Terms &amp; Conditions
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
                        These Terms and Conditions (&quot;Terms&quot;) govern
                        your access to and use of the website, applications, and
                        related services (collectively, the &quot;Services&quot;)
                        provided by Aaditri Technologies (&quot;Company,&quot;
                        &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;),
                        including the ExitDebt platform.
                    </p>
                    <p>
                        By accessing or using our Services, you agree to be
                        bound by these Terms. If you do not agree, you must not
                        access or use the Services.
                    </p>

                    {/* Section 1 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            1. Eligibility
                        </h2>
                        <p>
                            You must be at least 18 years of age and a resident
                            of India to use our Services. By using the Services,
                            you represent and warrant that you meet these
                            requirements and that all information you provide is
                            accurate, current, and complete.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            2. Description of Services
                        </h2>
                        <p>
                            We provide a technology platform related to
                            financial wellness and debt management. The scope,
                            features, pricing, and availability of our Services
                            may change at any time without prior notice.
                            Registration or expression of interest does not
                            guarantee access to any particular service, feature,
                            or benefit.
                        </p>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            3. User Obligations
                        </h2>
                        <p>By using the Services, you agree to:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>
                                Provide accurate and truthful information
                            </li>
                            <li>
                                Not submit information belonging to another
                                person without their authorization
                            </li>
                            <li>
                                Not use the Services for any unlawful,
                                fraudulent, or harmful purpose
                            </li>
                            <li>
                                Not interfere with or disrupt the operation of
                                the Services
                            </li>
                            <li>
                                Not attempt to gain unauthorized access to our
                                systems, data, or networks
                            </li>
                            <li>
                                Comply with all applicable laws and regulations
                            </li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            4. Communications
                        </h2>
                        <p>
                            By providing your contact information, you consent
                            to receive communications from us through any
                            medium, including but not limited to email, SMS,
                            WhatsApp, telephone calls, push notifications, and
                            in-app messages. These communications may include:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Service-related notices and updates</li>
                            <li>
                                Promotional and marketing communications
                            </li>
                            <li>Product announcements and offers</li>
                            <li>
                                Communications from our partners and affiliates
                            </li>
                        </ul>
                        <p className="mt-3">
                            You may opt out of promotional communications at any
                            time by using the unsubscribe mechanism provided in
                            our communications or by contacting us directly.
                            Opting out of promotional communications does not
                            affect service-related communications.
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            5. Intellectual Property
                        </h2>
                        <p>
                            All content, features, functionality, trademarks,
                            logos, design elements, and proprietary technology
                            associated with the Services are owned by or
                            licensed to the Company and are protected under
                            applicable intellectual property laws. You may not
                            copy, modify, distribute, sell, or lease any part of
                            our Services without our prior written consent.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            6. Disclaimer of Warranties
                        </h2>
                        <p
                            className="uppercase text-sm font-medium"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            The Services are provided on an &quot;as is&quot;
                            and &quot;as available&quot; basis without
                            warranties of any kind, whether express, implied, or
                            statutory, including but not limited to warranties
                            of merchantability, fitness for a particular
                            purpose, accuracy, and non-infringement.
                        </p>
                        <p className="mt-3">
                            We do not warrant that the Services will be
                            uninterrupted, error-free, secure, or available at
                            any particular time. We do not provide financial,
                            legal, tax, or investment advice. Any information
                            provided through the Services is for general
                            informational purposes only and should not be relied
                            upon as professional advice.
                        </p>
                    </section>

                    {/* Section 7 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            7. Limitation of Liability
                        </h2>
                        <p
                            className="uppercase text-sm font-medium"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            To the maximum extent permitted by applicable law,
                            the Company, its directors, officers, employees,
                            affiliates, and agents shall not be liable for any
                            indirect, incidental, special, consequential, or
                            punitive damages, including but not limited to loss
                            of profits, data, use, or goodwill, arising out of
                            or in connection with your use of the Services,
                            whether based on warranty, contract, tort, or any
                            other legal theory.
                        </p>
                        <p
                            className="mt-3 uppercase text-sm font-medium"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            Our total liability for any claim arising out of or
                            relating to these Terms or the Services shall not
                            exceed the amount, if any, paid by you to us in the
                            twelve (12) months preceding the claim.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            8. Indemnification
                        </h2>
                        <p>
                            You agree to indemnify, defend, and hold harmless
                            the Company and its officers, directors, employees,
                            agents, and affiliates from and against any claims,
                            liabilities, damages, losses, costs, and expenses
                            (including reasonable legal fees) arising out of or
                            related to your use of the Services, your violation
                            of these Terms, or your violation of any rights of a
                            third party.
                        </p>
                    </section>

                    {/* Section 9 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            9. Privacy
                        </h2>
                        <p>
                            Your use of the Services is also governed by our{" "}
                            <Link
                                href="/privacy"
                                className="underline font-medium transition-colors"
                                style={{ color: "var(--color-teal)" }}
                            >
                                Privacy Policy
                            </Link>
                            , which is incorporated into these Terms by
                            reference.
                        </p>
                    </section>

                    {/* Section 10 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            10. Modifications
                        </h2>
                        <p>
                            We reserve the right to modify, suspend, or
                            discontinue the Services (or any part thereof) at
                            any time, with or without notice. We may also update
                            these Terms from time to time. The updated Terms
                            will be effective upon posting on our website. Your
                            continued use of the Services after any changes
                            constitutes acceptance of the revised Terms.
                        </p>
                    </section>

                    {/* Section 11 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            11. Termination
                        </h2>
                        <p>
                            We may terminate or suspend your access to the
                            Services at our sole discretion, without prior
                            notice or liability, for any reason, including but
                            not limited to a breach of these Terms. Upon
                            termination, your right to use the Services will
                            cease immediately.
                        </p>
                    </section>

                    {/* Section 12 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            12. Governing Law and Dispute Resolution
                        </h2>
                        <p>
                            These Terms are governed by and construed in
                            accordance with the laws of India. Any disputes
                            arising out of or in connection with these Terms
                            shall be subject to the exclusive jurisdiction of
                            the courts in Bengaluru, India.
                        </p>
                        <p className="mt-3">
                            Before initiating any formal proceedings, you agree
                            to first attempt to resolve disputes informally by
                            contacting us at the details provided in Section 14.
                        </p>
                    </section>

                    {/* Section 13 */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            13. Severability
                        </h2>
                        <p>
                            If any provision of these Terms is found to be
                            unenforceable or invalid, that provision shall be
                            limited or eliminated to the minimum extent
                            necessary so that the remaining provisions remain in
                            full force and effect.
                        </p>
                    </section>

                    {/* Section 14 - Contact */}
                    <section>
                        <h2
                            className="text-lg font-bold mb-3"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            14. Contact Us
                        </h2>
                        <p className="mb-4">
                            If you have questions about these Terms, please
                            contact us:
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
