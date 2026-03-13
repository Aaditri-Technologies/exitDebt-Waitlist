import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { NextRequest } from 'next/server';

// Mock dependencies before importing the route
vi.mock('../../lib/db', () => ({
    getPool: vi.fn(),
}));

vi.mock('../../lib/rate-limit', () => ({
    rateLimit: vi.fn(),
}));

vi.mock('../../lib/city-state', () => ({
    getStateFromCity: vi.fn(() => 'Maharashtra'),
}));

import { POST } from '../../app/api/waitlist/route';
import { getPool } from '../../lib/db';
import { rateLimit } from '../../lib/rate-limit';

describe('POST /api/waitlist', () => {
    const mockQuery = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (getPool as Mock).mockReturnValue({ query: mockQuery });
        (rateLimit as Mock).mockResolvedValue({ allowed: true, remaining: 14 });
    });

    function makeRequest(body: Record<string, unknown>): NextRequest {
        return new NextRequest('http://localhost/api/waitlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
    }

    const validBody = {
        name: 'Test User',
        mobile: '+919876543210',
        place: 'Mumbai',
        totalDebt: 500000,
        honeypot: '',
        formLoadedAt: Date.now() - 10000, // 10 seconds ago
    };

    it('returns 201 on valid submission', async () => {
        mockQuery
            .mockResolvedValueOnce({ rows: [] })           // dup check
            .mockResolvedValueOnce({ rows: [{ id: 42 }] }); // insert

        const res = await POST(makeRequest(validBody));
        const json = await res.json();

        expect(res.status).toBe(201);
        expect(json.success).toBe(true);
        expect(json.id).toBe(42);
    });

    it('returns 429 when rate limited', async () => {
        (rateLimit as Mock).mockResolvedValue({ allowed: false, remaining: 0 });

        const res = await POST(makeRequest(validBody));
        expect(res.status).toBe(429);
    });

    it('returns 400 for missing required fields', async () => {
        const res = await POST(makeRequest({ name: '', mobile: '', place: '', totalDebt: '' }));
        const json = await res.json();

        expect(res.status).toBe(400);
        expect(json.success).toBe(false);
        expect(json.error).toBeTruthy();
    });

    it('returns 400 for invalid mobile number', async () => {
        const res = await POST(makeRequest({ ...validBody, mobile: '+19876543210' }));
        const json = await res.json();

        expect(res.status).toBe(400);
        expect(json.error).toContain('valid 10-digit Indian number');
    });

    it('returns 409 for duplicate mobile within 24h', async () => {
        mockQuery.mockResolvedValueOnce({ rows: [{ id: 1 }] }); // dup found

        const res = await POST(makeRequest(validBody));
        const json = await res.json();

        expect(res.status).toBe(409);
        expect(json.error).toContain('already registered');
    });

    it('silently returns fake success for honeypot-triggered bots', async () => {
        const res = await POST(makeRequest({ ...validBody, honeypot: 'bot-value' }));
        const json = await res.json();

        expect(res.status).toBe(201);
        expect(json.success).toBe(true);
        // Should NOT have made any DB calls
        expect(mockQuery).not.toHaveBeenCalled();
    });

    it('silently returns fake success for too-fast submissions', async () => {
        const res = await POST(makeRequest({ ...validBody, formLoadedAt: Date.now() - 500 }));
        const json = await res.json();

        expect(res.status).toBe(201);
        expect(json.success).toBe(true);
        expect(mockQuery).not.toHaveBeenCalled();
    });

    it('sanitizes inputs before insertion (SQL injection attempt)', async () => {
        mockQuery
            .mockResolvedValueOnce({ rows: [] })
            .mockResolvedValueOnce({ rows: [{ id: 99 }] });

        const malicious = {
            ...validBody,
            name: '<script>alert("xss")</script>',
            place: "'; DROP TABLE waitlist; --",
        };

        const res = await POST(makeRequest(malicious));
        expect(res.status).toBe(201);

        // Verify the INSERT call used sanitized values
        const insertCall = mockQuery.mock.calls[1];
        const [, params] = insertCall;
        expect(params[0]).not.toContain('<script>');
        expect(params[0]).toContain('&lt;script&gt;');
    });
});
