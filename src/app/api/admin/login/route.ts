import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { rateLimit } from "@/lib/rate-limit";
import { SESSION_OPTIONS, SessionData } from "@/lib/session";
import { timingSafeEqual } from "crypto";

/**
 * Timing-safe string comparison to prevent timing attacks.
 */
function timingSafeCompare(a: string, b: string): boolean {
    try {
        const bufA = Buffer.from(a, "utf-8");
        const bufB = Buffer.from(b, "utf-8");
        if (bufA.length !== bufB.length) {
            timingSafeEqual(bufA, bufA);
            return false;
        }
        return timingSafeEqual(bufA, bufB);
    } catch {
        return false;
    }
}

/**
 * POST /api/admin/login
 * Body: { secret: string }
 * Sets an encrypted HTTP-only session cookie on success.
 */
export async function POST(request: NextRequest) {
    const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "unknown";

    // Rate limit login attempts: 10 per 15 minutes
    const { allowed } = await rateLimit(`admin-login:${ip}`, 10, 15 * 60 * 1000);
    if (!allowed) {
        return NextResponse.json(
            { success: false, error: "Too many login attempts. Please try again later." },
            { status: 429, headers: { "Retry-After": "900" } }
        );
    }

    try {
        const body = await request.json();
        const { secret } = body;

        if (!secret || typeof secret !== "string") {
            return NextResponse.json(
                { success: false, error: "Secret is required." },
                { status: 400 }
            );
        }

        const adminSecret = process.env.ADMIN_SECRET;

        if (!adminSecret || adminSecret.length < 8) {
            console.error("ADMIN_SECRET is not set or too weak (must be >= 8 chars).");
            return NextResponse.json(
                { success: false, error: "Server configuration error." },
                { status: 500 }
            );
        }

        if (!timingSafeCompare(secret, adminSecret)) {
            return NextResponse.json(
                { success: false, error: "Invalid secret." },
                { status: 401 }
            );
        }

        // Set session cookie via next/headers cookies()
        const cookieStore = await cookies();
        const session = await getIronSession<SessionData>(cookieStore, SESSION_OPTIONS);
        session.isAdmin = true;
        await session.save();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Admin login error:", error);
        return NextResponse.json(
            { success: false, error: "Login failed." },
            { status: 500 }
        );
    }
}
