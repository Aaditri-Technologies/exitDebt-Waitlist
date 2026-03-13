import { describe, it, expect } from 'vitest';
import { sanitizeString, sanitizeDebt } from '../sanitize';

describe('sanitizeString', () => {
    it('escapes HTML angle brackets', () => {
        expect(sanitizeString('<script>alert("xss")</script>')).toBe(
            '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
        );
    });

    it('escapes double quotes', () => {
        expect(sanitizeString('He said "hello"')).toBe('He said &quot;hello&quot;');
    });

    it('escapes single quotes', () => {
        expect(sanitizeString("it's fine")).toBe("it&#x27;s fine");
    });

    it('trims leading and trailing whitespace', () => {
        expect(sanitizeString('  Rahul Sharma  ')).toBe('Rahul Sharma');
    });

    it('handles combined HTML entities and whitespace', () => {
        expect(sanitizeString('  <b>Bold</b>  ')).toBe('&lt;b&gt;Bold&lt;/b&gt;');
    });

    it('returns empty string for whitespace-only input', () => {
        expect(sanitizeString('   ')).toBe('');
    });

    it('passes through normal text unchanged', () => {
        expect(sanitizeString('Rahul Sharma')).toBe('Rahul Sharma');
    });

    it('handles empty string', () => {
        expect(sanitizeString('')).toBe('');
    });
});

describe('sanitizeDebt', () => {
    it('returns the value when within valid range', () => {
        expect(sanitizeDebt(500000)).toBe(500000);
    });

    it('clamps to minimum of 1 for zero', () => {
        expect(sanitizeDebt(0)).toBe(1);
    });

    it('clamps to minimum of 1 for negative values', () => {
        expect(sanitizeDebt(-100)).toBe(1);
    });

    it('allows values exceeding 100 crore', () => {
        expect(sanitizeDebt(2_000_000_000)).toBe(2_000_000_000);
    });

    it('handles decimal debt values', () => {
        expect(sanitizeDebt(50000.75)).toBe(50000.75);
    });

    it('clamps minimum of 1 for fractional values below 1', () => {
        expect(sanitizeDebt(0.5)).toBe(1);
    });
});
