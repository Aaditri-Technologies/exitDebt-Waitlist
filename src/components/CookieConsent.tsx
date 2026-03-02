"use client";

import { useState, useEffect } from "react";

const COOKIE_CONSENT_KEY = "exitdebt_cookie_consent";

/**
 * Cookie consent banner.
 * Appears at the bottom of the page on first visit.
 * Stores preference in localStorage so it only shows once.
 */
export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
            if (!consent) {
                // Small delay so it doesn't flash during page load
                const timer = setTimeout(() => setVisible(true), 1000);
                return () => clearTimeout(timer);
            }
        }
    }, []);

    function handleAccept() {
        localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
        setVisible(false);
    }

    function handleDecline() {
        localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
        setVisible(false);
    }

    if (!visible) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 animate-slideUp"
            style={{ pointerEvents: "none" }}
        >
            <div
                className="max-w-lg mx-auto rounded-2xl p-5 sm:p-6"
                style={{
                    pointerEvents: "auto",
                    backgroundColor: "var(--color-bg-card)",
                    border: "1px solid var(--color-border)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
                }}
            >
                <div className="flex items-start gap-3 mb-4">
                    <span className="text-xl flex-shrink-0">🍪</span>
                    <div>
                        <h3
                            className="text-sm font-bold mb-1"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            We use cookies
                        </h3>
                        <p
                            className="text-xs leading-relaxed"
                            style={{ color: "var(--color-text-muted)" }}
                        >
                            We use essential cookies to keep our site working properly.
                            No tracking or advertising cookies are used.
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleDecline}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer hover:opacity-80"
                        style={{
                            backgroundColor: "var(--color-bg-soft)",
                            border: "1px solid var(--color-border)",
                            color: "var(--color-text-secondary)",
                        }}
                    >
                        Decline
                    </button>
                    <button
                        onClick={handleAccept}
                        className="flex-1 py-2 rounded-xl text-xs font-bold text-white transition-all cursor-pointer hover:opacity-90"
                        style={{ backgroundColor: "var(--color-teal)" }}
                    >
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
}
