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
    // Only clamp the minimum value to 1 to ensure a positive number
    const MIN_DEBT = 1;
    return Math.max(value, MIN_DEBT);
}
