import { describe, expect, test } from '@jest/globals';
import { slugify } from '../utils';
import { calculateDiscountedRate, calculateDiscountRateDiff } from '../utils';

describe('slugify', () => {
    test('converts a simple sentence to lowercase hyphenated format', () => {
        expect(slugify('Hello World')).toBe('hello-world');
    });

    test('removes special characters', () => {
        expect(slugify('Hello @ World!')).toBe('hello-world');
    });

    test('trims leading and trailing spaces', () => {
        expect(slugify('   Trim me  ')).toBe('trim-me');
    });

    test('collapses multiple spaces into a single hyphen', () => {
        expect(slugify('one    two  three')).toBe('one-two-three');
    });

    test('collapses multiple hyphens into one', () => {
        expect(slugify('already--slugified--text')).toBe(
            'already-slugified-text'
        );
    });

    test('handles empty string input', () => {
        expect(slugify('')).toBe('');
    });

    test('returns a hyphenated version of camelCase', () => {
        expect(slugify('thisIsCamelCase')).toBe('thisiscamelcase');
    });

    test('preserves hyphens in words', () => {
        expect(slugify('pre-existing conditions')).toBe(
            'pre-existing-conditions'
        );
    });
});

describe('calculateDiscountRateDiff', () => {
    test('returns the floored difference between rate and discounted rate', () => {
        const result = calculateDiscountRateDiff(100, 0.15);
        expect(result).toBe(15);
    });

    test('uses default discount if none is provided', () => {
        const result = calculateDiscountRateDiff(100);
        expect(result).toBe(10);
    });

    test('floors the result correctly', () => {
        const result = calculateDiscountRateDiff(100, 0.144);
        expect(result).toBe(15);
    });

    test('returns 0 if rate equals discounted rate', () => {
        const result = calculateDiscountRateDiff(100, 0);
        expect(result).toBe(0);
    });
});

describe('calculateDiscountedRate', () => {
    test('applies a 10% discount by default', () => {
        expect(calculateDiscountedRate(100)).toBe(90);
    });

    test('applies a given discount correctly', () => {
        expect(calculateDiscountedRate(200, 0.25)).toBe(150);
    });

    test("floors the result if it's a decimal", () => {
        expect(calculateDiscountedRate(99, 0.15)).toBe(84);
    });

    test('returns original rate if discount is 0', () => {
        expect(calculateDiscountedRate(80, 0)).toBe(80);
    });

    test('returns 0 if discount is 100%', () => {
        expect(calculateDiscountedRate(50, 1)).toBe(0);
    });

    test('handles fractional rates', () => {
        expect(calculateDiscountedRate(49.99, 0.1)).toBe(44);
    });

    test('handles large numbers', () => {
        expect(calculateDiscountedRate(1000000, 0.2)).toBe(800000);
    });

    test('handles negative discounts (increases price)', () => {
        expect(calculateDiscountedRate(100, -0.1)).toBe(110);
    });

    test('handles discount greater than 1 (surcharge)', () => {
        expect(calculateDiscountedRate(100, 1.5)).toBe(-50);
    });
});
