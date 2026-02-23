import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
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
 * Authenticate admin request. Returns error response or null if authenticated.
 */
function authenticateAdmin(request: NextRequest): NextResponse | null {
    const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "unknown";

    const { allowed } = rateLimit(`admin:${ip}`, 30, 15 * 60 * 1000);
    if (!allowed) {
        return NextResponse.json(
            { success: false, error: "Too many attempts. Please try again later." },
            { status: 429, headers: { "Retry-After": "900" } }
        );
    }

    const secret = request.headers.get("x-admin-secret");
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminSecret || adminSecret.length < 8) {
        console.error("ADMIN_SECRET is not set or too weak (must be >= 8 chars).");
        return NextResponse.json(
            { success: false, error: "Server configuration error." },
            { status: 500 }
        );
    }

    if (!secret || !timingSafeCompare(secret, adminSecret)) {
        return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
        );
    }

    return null; // authenticated
}

/**
 * GET /api/admin/waitlist
 * Returns all waitlist submissions (active + archived).
 */
export async function GET(request: NextRequest) {
    const authError = authenticateAdmin(request);
    if (authError) return authError;

    try {
        const pool = getPool();
        const result = await pool.query(
            "SELECT id, name, mobile, place, state, total_debt, archived, created_at FROM waitlist ORDER BY created_at DESC"
        );

        return NextResponse.json({
            success: true,
            data: result.rows,
            count: result.rowCount,
        });
    } catch (error) {
        console.error("Admin waitlist API error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch waitlist data." },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/admin/waitlist
 * Archive or restore a waitlist entry.
 * Body: { id: number, archived: boolean }
 */
export async function PATCH(request: NextRequest) {
    const authError = authenticateAdmin(request);
    if (authError) return authError;

    try {
        const body = await request.json();
        const { id, archived } = body;

        if (!id || typeof id !== "number") {
            return NextResponse.json(
                { success: false, error: "Valid entry ID is required." },
                { status: 400 }
            );
        }

        if (typeof archived !== "boolean") {
            return NextResponse.json(
                { success: false, error: "archived must be a boolean." },
                { status: 400 }
            );
        }

        const pool = getPool();
        const result = await pool.query(
            "UPDATE waitlist SET archived = $1 WHERE id = $2 RETURNING id",
            [archived, id]
        );

        if (result.rowCount === 0) {
            return NextResponse.json(
                { success: false, error: "Entry not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: archived ? "Entry archived." : "Entry restored.",
        });
    } catch (error) {
        console.error("Admin archive error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update entry." },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/admin/waitlist
 * Permanently delete a waitlist entry.
 * Body: { id: number }
 */
export async function DELETE(request: NextRequest) {
    const authError = authenticateAdmin(request);
    if (authError) return authError;

    try {
        const body = await request.json();
        const { id } = body;

        if (!id || typeof id !== "number") {
            return NextResponse.json(
                { success: false, error: "Valid entry ID is required." },
                { status: 400 }
            );
        }

        const pool = getPool();
        const result = await pool.query(
            "DELETE FROM waitlist WHERE id = $1 RETURNING id",
            [id]
        );

        if (result.rowCount === 0) {
            return NextResponse.json(
                { success: false, error: "Entry not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Entry permanently deleted.",
        });
    } catch (error) {
        console.error("Admin delete error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete entry." },
            { status: 500 }
        );
    }
}
