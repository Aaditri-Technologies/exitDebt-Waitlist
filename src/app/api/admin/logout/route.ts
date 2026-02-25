import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { getSessionOptions, SessionData } from "@/lib/session";

/**
 * POST /api/admin/logout
 * Destroys the admin session cookie.
 */
export async function POST() {
    try {
        const cookieStore = await cookies();
        const session = await getIronSession<SessionData>(cookieStore, getSessionOptions());
        session.destroy();
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json(
            { success: false, error: "Logout failed." },
            { status: 500 }
        );
    }
}
