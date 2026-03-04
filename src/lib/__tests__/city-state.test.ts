import { describe, it, expect } from 'vitest';
import { getStateFromCity, getAllStates } from '../city-state';

describe('getStateFromCity', () => {
    it('returns correct state for a known city', () => {
        expect(getStateFromCity('Mumbai')).toBe('Maharashtra');
    });

    it('is case-insensitive', () => {
        expect(getStateFromCity('DELHI')).toBe('Delhi');
        expect(getStateFromCity('delhi')).toBe('Delhi');
        expect(getStateFromCity('Delhi')).toBe('Delhi');
    });

    it('trims whitespace from input', () => {
        expect(getStateFromCity('  Pune  ')).toBe('Maharashtra');
    });

    it('returns "Other" for unknown cities', () => {
        expect(getStateFromCity('Springfield')).toBe('Other');
    });

    it('returns "Other" for empty string', () => {
        expect(getStateFromCity('')).toBe('Other');
    });

    it('handles multi-word city names', () => {
        expect(getStateFromCity('new delhi')).toBe('Delhi');
        expect(getStateFromCity('navi mumbai')).toBe('Maharashtra');
        expect(getStateFromCity('greater noida')).toBe('Uttar Pradesh');
    });

    it('maps alternate city names correctly', () => {
        expect(getStateFromCity('bengaluru')).toBe('Karnataka');
        expect(getStateFromCity('bangalore')).toBe('Karnataka');
    });

    it('handles cities from different regions', () => {
        expect(getStateFromCity('surat')).toBe('Gujarat');
        expect(getStateFromCity('kolkata')).toBe('West Bengal');
        expect(getStateFromCity('jaipur')).toBe('Rajasthan');
        expect(getStateFromCity('kochi')).toBe('Kerala');
        expect(getStateFromCity('hyderabad')).toBe('Telangana');
        expect(getStateFromCity('patna')).toBe('Bihar');
        expect(getStateFromCity('guwahati')).toBe('Assam');
        expect(getStateFromCity('gangtok')).toBe('Sikkim');
    });

    it('handles NCR cities mapping to correct states', () => {
        expect(getStateFromCity('noida')).toBe('Uttar Pradesh');
        expect(getStateFromCity('gurgaon')).toBe('Haryana');
        expect(getStateFromCity('gurugram')).toBe('Haryana');
        expect(getStateFromCity('faridabad')).toBe('Haryana');
        expect(getStateFromCity('ghaziabad')).toBe('Uttar Pradesh');
    });
});

describe('getAllStates', () => {
    it('returns an array of strings', () => {
        const states = getAllStates();
        expect(Array.isArray(states)).toBe(true);
        states.forEach((s) => expect(typeof s).toBe('string'));
    });

    it('contains no duplicates', () => {
        const states = getAllStates();
        const unique = new Set(states);
        expect(unique.size).toBe(states.length);
    });

    it('is sorted alphabetically', () => {
        const states = getAllStates();
        const sorted = [...states].sort();
        expect(states).toEqual(sorted);
    });

    it('includes major states', () => {
        const states = getAllStates();
        expect(states).toContain('Maharashtra');
        expect(states).toContain('Delhi');
        expect(states).toContain('Karnataka');
        expect(states).toContain('Tamil Nadu');
        expect(states).toContain('Gujarat');
        expect(states).toContain('Kerala');
    });

    it('does not include "Other"', () => {
        const states = getAllStates();
        expect(states).not.toContain('Other');
    });
});
