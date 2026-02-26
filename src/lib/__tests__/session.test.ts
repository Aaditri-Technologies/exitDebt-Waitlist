import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getSessionOptions } from '../session';

describe('getSessionOptions', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        vi.resetModules();
        process.env = { ...originalEnv };
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    it('returns valid session options with a correct secret', () => {
        process.env.SESSION_SECRET = 'a-super-secret-key-that-is-at-least-32-chars!';
        process.env.NODE_ENV = 'development';

        const options = getSessionOptions();
        expect(options.password).toBe('a-super-secret-key-that-is-at-least-32-chars!');
        expect(options.cookieName).toBe('exitdebt_admin');
        expect(options.cookieOptions?.secure).toBe(false);
    });

    it('uses fallback password in development when secret is missing', () => {
        delete process.env.SESSION_SECRET;
        process.env.NODE_ENV = 'development';

        const options = getSessionOptions();
        expect(options.password).toBe('dev-only-fallback-secret-32chars!');
    });

    it('throws in production when secret is missing or too short', () => {
        process.env.SESSION_SECRET = 'short';
        process.env.NODE_ENV = 'production';

        expect(() => getSessionOptions()).toThrowError(/must be set and at least 32 characters/);
    });

    it('sets secure cookie option in production', () => {
        process.env.SESSION_SECRET = 'a-super-secret-key-that-is-at-least-32-chars!';
        process.env.NODE_ENV = 'production';

        const options = getSessionOptions();
        expect(options.cookieOptions?.secure).toBe(true);
    });
});
