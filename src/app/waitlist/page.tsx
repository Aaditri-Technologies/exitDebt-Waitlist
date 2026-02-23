"use client";

import { useState, FormEvent, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function WaitlistPage() {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [place, setPlace] = useState("");
    const [totalDebt, setTotalDebt] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Field-level errors
    const [nameError, setNameError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [placeError, setPlaceError] = useState("");
    const [debtError, setDebtError] = useState("");

    // Check sessionStorage for prior submission
    useEffect(() => {
        if (typeof window !== "undefined") {
            const wasSubmitted = sessionStorage.getItem("waitlist_submitted");
            if (wasSubmitted === "true") {
                setSubmitted(true);
            }
        }
    }, []);

    function handleMobileChange(value: string) {
        const digits = value.replace(/\D/g, "").slice(0, 10);
        setMobile(digits);
        if (digits.length === 10 && !/^[6-9]\d{9}$/.test(digits)) {
            setMobileError("Must start with 6-9.");
        } else {
            setMobileError("");
        }
    }

    function handleDebtChange(value: string) {
        setTotalDebt(value);
        const num = Number(value);
        if (value && (isNaN(num) || num <= 0)) {
            setDebtError("Must be a positive number.");
        } else {
            setDebtError("");
        }
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError("");
        let valid = true;

        if (!name.trim()) {
            setNameError("Name is required.");
            valid = false;
        } else {
            setNameError("");
        }

        if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
            setMobileError("Enter a valid 10-digit Indian mobile number.");
            valid = false;
        } else {
            setMobileError("");
        }

        if (!place.trim()) {
            setPlaceError("Place is required.");
            valid = false;
        } else {
            setPlaceError("");
        }

        const debtNum = Number(totalDebt);
        if (!totalDebt || isNaN(debtNum) || debtNum <= 0) {
            setDebtError("Enter a valid positive amount.");
            valid = false;
        } else {
            setDebtError("");
        }

        if (!valid) return;

        setIsLoading(true);
        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    mobile: mobile.trim(),
                    place: place.trim(),
                    totalDebt: debtNum,
                }),
            });

            const data = await res.json();

            if (data.success) {
                setSubmitted(true);
                if (typeof window !== "undefined") {
                    sessionStorage.setItem("waitlist_submitted", "true");
                }
            } else {
                setError(data.error || "Something went wrong. Please try again.");
            }
        } catch {
            setError("Network error. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    }

    // Format debt value for display
    function formatDebt(value: string): string {
        const num = Number(value);
        if (isNaN(num) || num === 0) return "";
        if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)} Cr`;
        if (num >= 100000) return `₹${(num / 100000).toFixed(1)} L`;
        if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
        return `₹${num}`;
    }

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-bg)" }}>
            <Navbar />

            <main className="flex-1">
                {/* Hero area */}
                <section style={{ backgroundColor: "var(--color-bg-soft)" }}>
                    <div className="max-w-6xl mx-auto px-8 py-20 lg:py-28">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                            {/* Left — Headline */}
                            <div className="lg:col-span-7 animate-fadeIn">
                                <div
                                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6"
                                    style={{
                                        backgroundColor: "rgba(115,0,190,0.08)",
                                        color: "var(--color-purple)",
                                    }}
                                >
                                    Early access — Limited spots
                                </div>

                                <h1
                                    className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.15] tracking-tight mb-6"
                                    style={{ color: "var(--color-text-primary)" }}
                                >
                                    Join the{" "}
                                    <span style={{ color: "var(--color-purple)" }}>ExitDebt</span>{" "}
                                    Waitlist
                                </h1>

                                <p
                                    className="text-base leading-relaxed max-w-lg mb-8"
                                    style={{ color: "var(--color-text-secondary)" }}
                                >
                                    Be the first to access India&apos;s smartest debt management platform.
                                    We&apos;ll notify you as soon as we launch.
                                </p>

                                {/* Trust pills */}
                                <div className="flex flex-wrap gap-3">
                                    {["No spam, ever", "256-bit encrypted", "Be first in line"].map((t) => (
                                        <span
                                            key={t}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                                            style={{
                                                backgroundColor: "var(--color-bg-card)",
                                                border: "1px solid var(--color-border)",
                                                color: "var(--color-text-secondary)",
                                                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                                            }}
                                        >
                                            <span
                                                className="w-1.5 h-1.5 rounded-full"
                                                style={{ backgroundColor: "var(--color-purple)" }}
                                            />
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Right — Form Card */}
                            <div className="lg:col-span-5 animate-slideUp stagger-1">
                                {submitted ? (
                                    /* ─── Success State ─── */
                                    <div
                                        className="rounded-2xl p-7 sm:p-8 text-center"
                                        style={{
                                            backgroundColor: "var(--color-bg-card)",
                                            boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
                                        }}
                                    >
                                        <div
                                            className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center"
                                            style={{ backgroundColor: "rgba(5,150,105,0.1)" }}
                                        >
                                            <svg
                                                className="w-8 h-8"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                style={{ color: "var(--color-success)" }}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h2
                                            className="text-xl font-bold mb-2"
                                            style={{ color: "var(--color-text-primary)" }}
                                        >
                                            You&apos;re on the list! 🎉
                                        </h2>
                                        <p className="text-sm mb-1" style={{ color: "var(--color-text-secondary)" }}>
                                            Thank you for joining the ExitDebt waitlist.
                                        </p>
                                        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                                            We&apos;ll reach out to you as soon as we launch.
                                        </p>
                                        <div
                                            className="mt-6 pt-5 space-y-3"
                                            style={{ borderTop: "1px solid var(--color-border)" }}
                                        >
                                            <button
                                                onClick={() => {
                                                    setSubmitted(false);
                                                    setName("");
                                                    setMobile("");
                                                    setPlace("");
                                                    setTotalDebt("");
                                                    setError("");
                                                    if (typeof window !== "undefined") {
                                                        sessionStorage.removeItem("waitlist_submitted");
                                                    }
                                                }}
                                                className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 cursor-pointer"
                                                style={{
                                                    backgroundColor: "rgba(115,0,190,0.08)",
                                                    color: "var(--color-purple)",
                                                    border: "1px solid rgba(115,0,190,0.15)",
                                                }}
                                            >
                                                Submit another response →
                                            </button>
                                            <p className="text-xs text-center" style={{ color: "var(--color-text-muted)" }}>
                                                Questions? Reach out at{" "}
                                                <a
                                                    href="mailto:support@exitdebt.in"
                                                    className="underline"
                                                    style={{ color: "var(--color-purple)" }}
                                                >
                                                    support@exitdebt.in
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    /* ─── Form Card ─── */
                                    <div
                                        className="rounded-2xl p-7 sm:p-8"
                                        style={{
                                            backgroundColor: "var(--color-bg-card)",
                                            boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
                                        }}
                                    >
                                        <h2
                                            className="text-lg font-bold mb-1"
                                            style={{ color: "var(--color-text-primary)" }}
                                        >
                                            Sign up for early access
                                        </h2>
                                        <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
                                            Fill in your details. Takes 30 seconds.
                                        </p>

                                        {error && (
                                            <div
                                                className="mb-4 px-4 py-2 rounded-lg text-sm"
                                                style={{
                                                    backgroundColor: "rgba(220,38,38,0.08)",
                                                    color: "var(--color-danger)",
                                                }}
                                            >
                                                {error}
                                            </div>
                                        )}

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            {/* Name */}
                                            <div>
                                                <label
                                                    className="block text-sm font-medium mb-1.5"
                                                    style={{ color: "var(--color-text-secondary)" }}
                                                >
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => {
                                                        setName(e.target.value);
                                                        if (e.target.value.trim()) setNameError("");
                                                    }}
                                                    placeholder="Rahul Sharma"
                                                    maxLength={100}
                                                    className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2"
                                                    style={{
                                                        backgroundColor: "var(--color-bg-soft)",
                                                        border: `1px solid ${nameError ? "var(--color-danger)" : "var(--color-border)"}`,
                                                        color: "var(--color-text-primary)",
                                                    }}
                                                />
                                                {nameError && (
                                                    <p className="text-xs mt-1" style={{ color: "var(--color-danger)" }}>
                                                        {nameError}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Mobile */}
                                            <div>
                                                <label
                                                    className="block text-sm font-medium mb-1.5"
                                                    style={{ color: "var(--color-text-secondary)" }}
                                                >
                                                    Mobile Number
                                                </label>
                                                <div className="flex">
                                                    <span
                                                        className="px-3 py-3 rounded-l-xl text-sm flex items-center"
                                                        style={{
                                                            backgroundColor: "var(--color-bg-soft)",
                                                            border: "1px solid var(--color-border)",
                                                            borderRight: "none",
                                                            color: "var(--color-text-muted)",
                                                        }}
                                                    >
                                                        +91
                                                    </span>
                                                    <input
                                                        type="tel"
                                                        value={mobile}
                                                        onChange={(e) => handleMobileChange(e.target.value)}
                                                        placeholder="9876543210"
                                                        maxLength={10}
                                                        className="flex-1 px-4 py-3 rounded-r-xl text-sm transition-all focus:outline-none focus:ring-2"
                                                        style={{
                                                            backgroundColor: "var(--color-bg-soft)",
                                                            border: `1px solid ${mobileError ? "var(--color-danger)" : "var(--color-border)"}`,
                                                            color: "var(--color-text-primary)",
                                                        }}
                                                    />
                                                </div>
                                                {mobileError && (
                                                    <p className="text-xs mt-1" style={{ color: "var(--color-danger)" }}>
                                                        {mobileError}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Place */}
                                            <div>
                                                <label
                                                    className="block text-sm font-medium mb-1.5"
                                                    style={{ color: "var(--color-text-secondary)" }}
                                                >
                                                    City / Place
                                                </label>
                                                <input
                                                    type="text"
                                                    value={place}
                                                    onChange={(e) => {
                                                        setPlace(e.target.value);
                                                        if (e.target.value.trim()) setPlaceError("");
                                                    }}
                                                    placeholder="Mumbai"
                                                    maxLength={100}
                                                    className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2"
                                                    style={{
                                                        backgroundColor: "var(--color-bg-soft)",
                                                        border: `1px solid ${placeError ? "var(--color-danger)" : "var(--color-border)"}`,
                                                        color: "var(--color-text-primary)",
                                                    }}
                                                />
                                                {placeError && (
                                                    <p className="text-xs mt-1" style={{ color: "var(--color-danger)" }}>
                                                        {placeError}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Total Debt */}
                                            <div>
                                                <label
                                                    className="block text-sm font-medium mb-1.5"
                                                    style={{ color: "var(--color-text-secondary)" }}
                                                >
                                                    Total Debt Amount (₹)
                                                </label>
                                                <div className="relative">
                                                    <span
                                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-sm"
                                                        style={{ color: "var(--color-text-muted)" }}
                                                    >
                                                        ₹
                                                    </span>
                                                    <input
                                                        type="number"
                                                        value={totalDebt}
                                                        onChange={(e) => handleDebtChange(e.target.value)}
                                                        placeholder="500000"
                                                        min="1"
                                                        className="w-full pl-9 pr-16 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2"
                                                        style={{
                                                            backgroundColor: "var(--color-bg-soft)",
                                                            border: `1px solid ${debtError ? "var(--color-danger)" : "var(--color-border)"}`,
                                                            color: "var(--color-text-primary)",
                                                        }}
                                                    />
                                                    {totalDebt && !debtError && (
                                                        <span
                                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium"
                                                            style={{ color: "var(--color-success)" }}
                                                        >
                                                            {formatDebt(totalDebt)}
                                                        </span>
                                                    )}
                                                </div>
                                                {debtError && (
                                                    <p className="text-xs mt-1" style={{ color: "var(--color-danger)" }}>
                                                        {debtError}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer px-6 py-3 text-base text-white hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                                                style={{ backgroundColor: "var(--color-purple)" }}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                            <circle
                                                                className="opacity-25"
                                                                cx="12"
                                                                cy="12"
                                                                r="10"
                                                                stroke="currentColor"
                                                                strokeWidth="4"
                                                                fill="none"
                                                            />
                                                            <path
                                                                className="opacity-75"
                                                                fill="currentColor"
                                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                                            />
                                                        </svg>
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    "Join the Waitlist →"
                                                )}
                                            </button>
                                        </form>

                                        <p
                                            className="text-xs text-center mt-4"
                                            style={{ color: "var(--color-text-muted)" }}
                                        >
                                            🔒 Your information is safe and will never be shared.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
