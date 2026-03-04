import { NextRequest, NextResponse } from "next/server";

/**
 * Next.js Middleware — Security headers.
 *
 * Adds HTTP security headers to all responses to prevent:
 * - Clickjacking (X-Frame-Options)
 * - MIME type sniffing (X-Content-Type-Options)
 * - XSS (Content-Security-Policy)
 * - Information leakage (X-Powered-By removal, Referrer-Policy)
 *
 * This file MUST be named `middleware.ts` and live in `src/` for
 * Next.js to detect and activate it automatically.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Prevent clickjacking — only allow this site to frame itself
    response.headers.set("X-Frame-Options", "SAMEORIGIN");

    // Prevent MIME type sniffing
    response.headers.set("X-Content-Type-Options", "nosniff");

    // Basic XSS protection
    response.headers.set("X-XSS-Protection", "1; mode=block");

    // Control referrer information sent with requests
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    // Restrict permissions (camera, microphone, etc.)
    response.headers.set(
        "Permissions-Policy",
        "camera=(), microphone=(), geolocation=(), payment=()"
    );

    // Remove server identification
    response.headers.delete("X-Powered-By");

    // Content Security Policy — restrict resources to same origin
    response.headers.set(
        "Content-Security-Policy",
        [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",  // Next.js needs these
            "style-src 'self' 'unsafe-inline'",                  // For inline styles
            "font-src 'self' https://fonts.gstatic.com",         // Google Fonts
            "img-src 'self' data: blob:",
            "connect-src 'self'",
            "frame-ancestors 'self'",
            "base-uri 'self'",
            "form-action 'self'",
        ].join("; ")
    );

    // HSTS — enforce HTTPS (only active when served over HTTPS)
    response.headers.set(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
    );

    return response;
}

// Apply to all routes except static files and Next.js internals
export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
