import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { rateLimit } from '../rate-limit';
import { getPool } from '../db';

// Mock the db module
vi.mock('../db', () => ({
    getPool: vi.fn(),
}));

describe('rateLimit', () => {
    const mockQuery = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (getPool as Mock).mockReturnValue({
            query: mockQuery,
        });
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2024-01-01T00:00:00Z'));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('allows request when under limit', async () => {
        mockQuery.mockResolvedValueOnce({
            rows: [{ count: 1, reset_at: Date.now() + 60000 }],
        });

        const result = await rateLimit('test-ip', 5, 60000);
        expect(result.allowed).toBe(true);
        expect(result.remaining).toBe(4);
        expect(mockQuery).toHaveBeenCalledTimes(1);
    });

    it('blocks request when over limit', async () => {
        mockQuery.mockResolvedValueOnce({
            rows: [{ count: 6, reset_at: Date.now() + 60000 }],
        });

        const result = await rateLimit('test-ip', 5, 60000);
        expect(result.allowed).toBe(false);
        expect(result.remaining).toBe(0);
    });

    it('fails open on database error', async () => {
        // Simulate DB failure
        mockQuery.mockRejectedValueOnce(new Error('DB Error'));

        // Console.error will be called, let's spy/mute it
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        const result = await rateLimit('test-ip', 5, 60000);
        expect(result.allowed).toBe(true);
        expect(result.remaining).toBe(5);

        consoleSpy.mockRestore();
    });
});
