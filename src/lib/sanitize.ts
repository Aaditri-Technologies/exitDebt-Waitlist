/**
 * Input sanitization utilities.
 * Strips potentially dangerous characters from user input
 * to prevent XSS when admin views stored data.
 */

/**
 * Strip HTML tags and trim whitespace.
 * Prevents stored XSS by removing any HTML from user input.
 */
export function sanitizeString(input: string): string {
    return input
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .trim();
}

/**
 * Validate and clamp a numeric value within a safe range.
 */
export function sanitizeDebt(value: number): number {
    // Cap at ₹100 crore (reasonable max debt for an individual)
    const MAX_DEBT = 1_000_000_000;
    const MIN_DEBT = 1;
    return Math.min(Math.max(value, MIN_DEBT), MAX_DEBT);
}
