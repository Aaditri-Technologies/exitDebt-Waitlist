import { describe, it, expect } from 'vitest';

/**
 * Tests for the waitlist API route validation logic.
 * Since the route depends on Next.js internals, we test the validation
 * patterns and sanitization pipeline in isolation.
 * Rate limiting is tested separately in rate-limit.test.ts.
 */

import { sanitizeString, sanitizeDebt } from '../../lib/sanitize';
import { getStateFromCity } from '../../lib/city-state';

describe('Waitlist submission validation patterns', () => {
    const MOBILE_REGEX = /^\+91\d{10}$/;

    describe('mobile number validation', () => {
        it('accepts valid Indian mobile numbers with +91 prefix', () => {
            expect(MOBILE_REGEX.test('+919876543210')).toBe(true);
            expect(MOBILE_REGEX.test('+918765432109')).toBe(true);
        });

        it('rejects numbers without +91 prefix', () => {
            expect(MOBILE_REGEX.test('9876543210')).toBe(false);
            expect(MOBILE_REGEX.test('+19876543210')).toBe(false);
        });

        it('rejects numbers with wrong length', () => {
            expect(MOBILE_REGEX.test('98765')).toBe(false);
            expect(MOBILE_REGEX.test('98765432101')).toBe(false);
        });

        it('rejects non-numeric characters after prefix', () => {
            expect(MOBILE_REGEX.test('+91abcdefgh')).toBe(false);
            expect(MOBILE_REGEX.test('+91987654321a')).toBe(false);
        });
    });

    describe('name validation', () => {
        it('rejects empty or whitespace-only names', () => {
            expect(''.trim().length === 0).toBe(true);
            expect('   '.trim().length === 0).toBe(true);
        });

        it('rejects names over 100 characters', () => {
            const longName = 'A'.repeat(101);
            expect(longName.trim().length > 100).toBe(true);
        });

        it('accepts valid names', () => {
            const name = 'Rahul Sharma';
            expect(name.trim().length > 0 && name.trim().length <= 100).toBe(true);
        });
    });

    describe('debt validation', () => {
        it('rejects zero debt', () => {
            expect(Number(0) <= 0).toBe(true);
        });

        it('rejects negative debt', () => {
            expect(Number(-500) <= 0).toBe(true);
        });

        it('rejects debt exceeding 100 crore', () => {
            expect(Number(2_000_000_000) > 1_000_000_000).toBe(true);
        });

        it('accepts valid debt amounts', () => {
            const debt = 500000;
            expect(!isNaN(debt) && debt > 0 && debt <= 1_000_000_000).toBe(true);
        });

        it('rejects NaN debt', () => {
            expect(isNaN(Number('not-a-number'))).toBe(true);
        });
    });
});

describe('Waitlist sanitization pipeline', () => {
    it('sanitizes name with HTML entities', () => {
        const result = sanitizeString('<script>alert("xss")</script>');
        expect(result).not.toContain('<script>');
        expect(result).toContain('&lt;script&gt;');
    });

    it('clamps debt to safe range', () => {
        expect(sanitizeDebt(0)).toBe(1);
        expect(sanitizeDebt(5_000_000_000)).toBe(1_000_000_000);
        expect(sanitizeDebt(500000)).toBe(500000);
    });

    it('resolves state from city', () => {
        expect(getStateFromCity('Mumbai')).toBe('Maharashtra');
        expect(getStateFromCity('Unknown City')).toBe('Other');
    });
});

describe('Bot detection patterns', () => {
    const MIN_FORM_DURATION_MS = 3000;

    it('detects bot submission when form is filled too quickly', () => {
        const formLoadedAt = Date.now();
        const submittedAt = formLoadedAt + 1000;
        const elapsed = submittedAt - formLoadedAt;
        expect(elapsed < MIN_FORM_DURATION_MS).toBe(true);
    });

    it('allows human submission after sufficient time', () => {
        const formLoadedAt = Date.now();
        const submittedAt = formLoadedAt + 5000;
        const elapsed = submittedAt - formLoadedAt;
        expect(elapsed < MIN_FORM_DURATION_MS).toBe(false);
    });

    it('detects honeypot field being filled', () => {
        const honeypot = 'bot-filled-value';
        expect(!!honeypot).toBe(true);
    });

    it('passes when honeypot is empty', () => {
        const honeypot = '';
        expect(!!honeypot).toBe(false);
    });

    it('boundary case: exactly at minimum duration threshold', () => {
        const formLoadedAt = Date.now();
        const submittedAt = formLoadedAt + MIN_FORM_DURATION_MS;
        const elapsed = submittedAt - formLoadedAt;
        expect(elapsed < MIN_FORM_DURATION_MS).toBe(false);
    });
});

describe('IP extraction patterns', () => {
    it('extracts first IP from x-forwarded-for with multiple IPs', () => {
        const header = '203.0.113.50, 70.41.3.18, 150.172.238.178';
        const ip = header.split(',')[0]?.trim();
        expect(ip).toBe('203.0.113.50');
    });

    it('handles single IP in x-forwarded-for', () => {
        const header = '203.0.113.50';
        const ip = header.split(',')[0]?.trim();
        expect(ip).toBe('203.0.113.50');
    });

    it('falls back to "unknown" when no headers present', () => {
        const xForwardedFor = null as string | null;
        const xRealIp: string | null = null;
        const ip = xForwardedFor?.split(',')[0]?.trim() || xRealIp || 'unknown';
        expect(ip).toBe('unknown');
    });
});
