"use client";

import { useState, FormEvent } from "react";

export default function WaitlistContent({ onBack }: { onBack?: () => void }) {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [place, setPlace] = useState("");
    const [totalDebt, setTotalDebt] = useState("");
    const [submitted, setSubmitted] = useState(() => {
        if (typeof window !== "undefined") {
            return sessionStorage.getItem("waitlist_submitted") === "true";
        }
        return false;
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Bot detection
    const [honeypot, setHoneypot] = useState("");
    const [formLoadedAt] = useState<number>(() => Date.now());

    // Field-level errors
    const [nameError, setNameError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [placeError, setPlaceError] = useState("");
    const [debtError, setDebtError] = useState("");

    // Stagger fade-in animation removed as per user request

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
                    honeypot,
                    formLoadedAt,
                }),
            });

            const data = await res.json();

            if (data.success) {
                // UI transition effect based on blueprint
                setTimeout(() => {
                    setSubmitted(true);
                    if (typeof window !== "undefined") {
                        sessionStorage.setItem("waitlist_submitted", "true");
                    }
                    setIsLoading(false);
                }, 400); // give time for some transition
            } else {
                setError(data.error || "Something went wrong. Please try again.");
                setIsLoading(false);
            }
        } catch {
            setError("Network error. Please check your connection and try again.");
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
        <main className="flex-1">
            {/* Hero area */}
            <section className="bg-transparent">
                <div className="max-w-6xl mx-auto px-8 py-20 lg:py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        {/* Left — Headline */}
                        <div className="lg:col-span-7">
                            {onBack && (
                                <button
                                    onClick={onBack}
                                    className="text-sm font-semibold mb-6 flex items-center gap-1 transition-opacity hover:opacity-80"
                                    style={{ color: "var(--color-teal)" }}
                                >
                                    ← Back to Home
                                </button>
                            )}

                            <div
                                className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6"
                                style={{
                                    backgroundColor: "rgba(19,78,74,0.08)",
                                    color: "var(--color-teal)",
                                }}
                            >
                                Early access — Limited spots
                            </div>

                            <h1
                                className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.15] tracking-tight mb-6"
                                style={{ color: "var(--color-text-primary)" }}
                            >
                                Join the{" "}
                                <span style={{ color: "var(--color-teal)" }}>ExitDebt</span>{" "}
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
                                            style={{ backgroundColor: "var(--color-teal)" }}
                                        />
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Right — Form Card */}
                        <div className="lg:col-span-5 relative">
                            {/* ─── Form Card ─── */}
                            <div
                                id="formCard"
                                className={`rounded-2xl p-6 sm:p-8 form-card ${submitted ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                                style={{
                                    backgroundColor: "var(--color-bg-card)",
                                    boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                                    transition: "opacity 0.4s ease",
                                    display: submitted ? "none" : "block",
                                    position: "relative",
                                    zIndex: submitted ? 0 : 10
                                }}
                            >
                                {error && (
                                    <div
                                        className="mb-6 px-4 py-3 rounded-lg text-sm"
                                        style={{
                                            backgroundColor: "rgba(220,38,38,0.08)",
                                            color: "var(--color-danger)",
                                        }}
                                    >
                                        {error}
                                    </div>
                                )}

                                <form id="waitlistForm" onSubmit={handleSubmit}>
                                    {/* Honeypot */}
                                    <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }} aria-hidden="true">
                                        <input
                                            type="text"
                                            name="website"
                                            tabIndex={-1}
                                            autoComplete="off"
                                            value={honeypot}
                                            onChange={(e) => setHoneypot(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group-relative mb-6">
                                        <input
                                            id="form-name"
                                            type="text"
                                            value={name}
                                            required
                                            onChange={(e) => {
                                                setName(e.target.value);
                                                if (e.target.value.trim()) setNameError("");
                                            }}
                                            placeholder=" "
                                        />
                                        <label htmlFor="form-name">Name</label>
                                        {nameError && (
                                            <p className="text-xs mt-1" style={{ color: "var(--color-danger)" }}>{nameError}</p>
                                        )}
                                    </div>

                                    <div className="form-group-relative mb-6">
                                        <input
                                            id="form-mobile"
                                            type="tel"
                                            value={mobile}
                                            required
                                            onChange={(e) => handleMobileChange(e.target.value)}
                                            placeholder=" "
                                            maxLength={10}
                                        />
                                        <label htmlFor="form-mobile">Mobile</label>
                                        {mobileError && (
                                            <p className="text-xs mt-1" style={{ color: "var(--color-danger)" }}>{mobileError}</p>
                                        )}
                                    </div>

                                    <div className="form-group-relative mb-6">
                                        <input
                                            id="form-place"
                                            type="text"
                                            value={place}
                                            required
                                            onChange={(e) => {
                                                setPlace(e.target.value);
                                                if (e.target.value.trim()) setPlaceError("");
                                            }}
                                            placeholder=" "
                                        />
                                        <label htmlFor="form-place">City</label>
                                        {placeError && (
                                            <p className="text-xs mt-1" style={{ color: "var(--color-danger)" }}>{placeError}</p>
                                        )}
                                    </div>

                                    <div className="form-group-relative mb-8">
                                        <input
                                            id="form-debt"
                                            type="number"
                                            value={totalDebt}
                                            required
                                            onChange={(e) => handleDebtChange(e.target.value)}
                                            placeholder=" "
                                            min="1"
                                        />
                                        <label htmlFor="form-debt">Total Debt (₹)</label>
                                        {!debtError ? (
                                            <small className="helper-text">
                                                {formatDebt(totalDebt) ? `Amount: ${formatDebt(totalDebt)} — ` : ""}
                                                Used only to personalize your early access.
                                            </small>
                                        ) : (
                                            <p className="text-xs mt-1" style={{ color: "var(--color-danger)" }}>{debtError}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        id="submitBtn"
                                        disabled={isLoading}
                                        className="waitlist-btn flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                                Securing your spot...
                                            </>
                                        ) : (
                                            "Join Waitlist"
                                        )}
                                    </button>
                                </form>
                            </div>

                            {/* ─── Success Card ─── */}
                            <div
                                id="successCard"
                                className={`rounded-2xl p-8 text-center bg-white success-card-anim ${submitted ? "success-card-visible" : "hidden"}`}
                                style={{
                                    boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                                    display: submitted ? "block" : "none"
                                }}
                            >
                                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-green-50">
                                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: "var(--color-text-primary)" }}>
                                    You&apos;re on the ExitDebt early access list.
                                </h2>
                                <p className="text-base mb-8" style={{ color: "var(--color-text-secondary)" }}>
                                    We&apos;ll notify you exactly when we launch.
                                </p>

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
                                    className="text-sm font-semibold transition-colors hover:text-teal-800"
                                    style={{ color: "var(--color-teal)" }}
                                >
                                    ← Register another person
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>


    );
}
