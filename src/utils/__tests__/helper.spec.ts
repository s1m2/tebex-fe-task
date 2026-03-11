import { describe, it, expect } from 'vitest';
import { currencyFormatter, calculateDiscountAmount } from '../helper';

describe('helper.ts', () => {
  describe('currencyFormatter', () => {
    it('formats a whole number as USD currency', () => {
      const result = currencyFormatter(100);
      expect(result).toBe('$100.00');
    });

    it('uses USD dollar sign', () => {
      const result = currencyFormatter(100);
      expect(result).toContain('$');
    });
  });

  describe('calculateDiscountAmount', () => {
    it('returns 0 when discount is 0', () => {
      const result = calculateDiscountAmount(100, 0);
      expect(result).toBe(0);
    });

    it('returns total amount when discount is 100', () => {
      const result = calculateDiscountAmount(100, 100);
      expect(result).toBe(100);
    });

    it('calculates 50% discount correctly', () => {
      const result = calculateDiscountAmount(100, 50);
      expect(result).toBe(50);
    });
  });
});
