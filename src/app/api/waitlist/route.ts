import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { sanitizeString, sanitizeDebt } from "@/lib/sanitize";
import { getStateFromCity } from "@/lib/city-state";

/** Minimum time (ms) a legitimate user would take to fill the form. */
const MIN_FORM_DURATION_MS = 3000;

/**
 * POST /api/waitlist
 * Accepts: { name, mobile, place, totalDebt, honeypot?, formLoadedAt? }
 * Security: rate-limited, input sanitized, duplicate-checked,
 *           honeypot + timing-based bot detection.
 */
export async function POST(request: NextRequest) {
    // ── Rate Limiting: 15 submissions per IP per 15 minutes ──
    const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "unknown";

    const { allowed, remaining } = await rateLimit(ip, 15, 15 * 60 * 1000);

    if (!allowed) {
        return NextResponse.json(
            { success: false, error: "Too many submissions. Please try again later." },
            {
                status: 429,
                headers: {
                    "Retry-After": "900",
                    "X-RateLimit-Remaining": "0",
                },
            }
        );
    }

    try {
        // ── Parse ──
        let body;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { success: false, error: "Invalid request body." },
                { status: 400 }
            );
        }

        const { name, mobile, place, totalDebt, honeypot, formLoadedAt } = body;

        // ── Bot Detection ──
        // Honeypot: hidden field that should always be empty
        if (honeypot) {
            // Return a fake success to not tip off the bot
            return NextResponse.json({ success: true, id: 0 }, { status: 201 });
        }

        // Timing: reject submissions faster than a human could fill the form
        if (formLoadedAt && typeof formLoadedAt === "number") {
            const elapsed = Date.now() - formLoadedAt;
            if (elapsed < MIN_FORM_DURATION_MS) {
                return NextResponse.json({ success: true, id: 0 }, { status: 201 });
            }
        }

        // ── Validation ──
        const errors: string[] = [];

        if (!name || typeof name !== "string" || name.trim().length === 0) {
            errors.push("Name is required.");
        } else if (name.trim().length > 100) {
            errors.push("Name must be 100 characters or less.");
        }

        if (!mobile || typeof mobile !== "string") {
            errors.push("Mobile number is required.");
        } else if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
            errors.push("Mobile must be a valid 10-digit Indian number (starting with 6-9).");
        }

        if (!place || typeof place !== "string" || place.trim().length === 0) {
            errors.push("Place is required.");
        } else if (place.trim().length > 100) {
            errors.push("Place must be 100 characters or less.");
        }

        const debtNum = Number(totalDebt);
        if (totalDebt === undefined || totalDebt === null || totalDebt === "") {
            errors.push("Total debt is required.");
        } else if (isNaN(debtNum) || debtNum <= 0) {
            errors.push("Total debt must be a positive number.");
        } else if (debtNum > 1_000_000_000) {
            errors.push("Total debt exceeds maximum allowed value.");
        }

        if (errors.length > 0) {
            return NextResponse.json(
                { success: false, error: errors.join(" ") },
                { status: 400 }
            );
        }

        // ── Sanitize inputs ──
        const safeName = sanitizeString(name);
        const safeMobile = mobile.trim();
        const safePlace = sanitizeString(place);
        const safeDebt = sanitizeDebt(debtNum);
        const safeState = getStateFromCity(place);

        // ── Duplicate check (same mobile in last 24 hours) ──
        const pool = getPool();
        const dupCheck = await pool.query(
            `SELECT id FROM waitlist 
             WHERE mobile = $1 AND created_at > NOW() - INTERVAL '24 hours'
             LIMIT 1`,
            [safeMobile]
        );

        if (dupCheck.rows.length > 0) {
            return NextResponse.json(
                { success: false, error: "This mobile number was already registered recently." },
                { status: 409 }
            );
        }

        // ── Insert ──
        const result = await pool.query(
            `INSERT INTO waitlist (name, mobile, place, state, total_debt)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id`,
            [safeName, safeMobile, safePlace, safeState, safeDebt]
        );

        return NextResponse.json(
            { success: true, id: result.rows[0].id },
            {
                status: 201,
                headers: {
                    "X-RateLimit-Remaining": String(remaining),
                },
            }
        );
    } catch (error) {
        console.error("Waitlist API error:", error);
        return NextResponse.json(
            { success: false, error: "Something went wrong. Please try again later." },
            { status: 500 }
        );
    }
}
