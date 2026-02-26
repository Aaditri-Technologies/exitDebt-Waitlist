import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { getPool } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { getSessionOptions, SessionData } from "@/lib/session";

/**
 * Authenticate admin request via session cookie.
 * Returns error response or null if authenticated.
 */
async function authenticateAdmin(request: NextRequest): Promise<NextResponse | null> {
    const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "unknown";

    const { allowed } = await rateLimit(`admin:${ip}`, 30, 15 * 60 * 1000);
    if (!allowed) {
        return NextResponse.json(
            { success: false, error: "Too many attempts. Please try again later." },
            { status: 429, headers: { "Retry-After": "900" } }
        );
    }

    // Read the session from the request cookies
    const cookieStore = await cookies();
    const session = await getIronSession<SessionData>(cookieStore, getSessionOptions());

    if (!session.isAdmin) {
        return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
        );
    }

    return null; // authenticated
}

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/waitlist
 * Returns all waitlist submissions (active + archived).
 */
export async function GET(request: NextRequest) {
    const authError = await authenticateAdmin(request);
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
    const authError = await authenticateAdmin(request);
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
    const authError = await authenticateAdmin(request);
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
