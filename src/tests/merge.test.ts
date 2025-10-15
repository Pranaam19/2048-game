
import { describe, it, expect } from 'vitest';
import { mergeLine, mergeLineRight, canMergeLine } from '../core/game-logic/merge';

describe('Merge Logic', () => {
  describe('mergeLine (left)', () => {
    it('should merge two identical tiles', () => {
      const result = mergeLine([2, 2, 0, 0]);
      expect(result.line).toEqual([4, 0, 0, 0]);
      expect(result.score).toBe(4);
    });

    it('should merge multiple pairs', () => {
      const result = mergeLine([2, 2, 4, 4]);
      expect(result.line).toEqual([4, 8, 0, 0]);
      expect(result.score).toBe(12); 
    });

    it('should merge only once per tile', () => {
      const result = mergeLine([2, 2, 2, 0]);
      expect(result.line).toEqual([4, 2, 0, 0]);
      expect(result.score).toBe(4);
    });

    it('should slide tiles without merging', () => {
      const result = mergeLine([2, 0, 4, 0]);
      expect(result.line).toEqual([2, 4, 0, 0]);
      expect(result.score).toBe(0);
    });

    it('should handle all same values', () => {
      const result = mergeLine([4, 4, 4, 4]);
      expect(result.line).toEqual([8, 8, 0, 0]);
      expect(result.score).toBe(16);
    });

    it('should handle empty line', () => {
      const result = mergeLine([0, 0, 0, 0]);
      expect(result.line).toEqual([0, 0, 0, 0]);
      expect(result.score).toBe(0);
    });

    it('should handle single tile', () => {
      const result = mergeLine([2, 0, 0, 0]);
      expect(result.line).toEqual([2, 0, 0, 0]);
      expect(result.score).toBe(0);
    });

    it('should handle complex merge scenario', () => {
      const result = mergeLine([2, 0, 2, 4]);
      expect(result.line).toEqual([4, 4, 0, 0]);
      expect(result.score).toBe(4);
    });
  });

  describe('mergeLineRight', () => {
    it('should merge tiles to the right', () => {
      const result = mergeLineRight([0, 0, 2, 2]);
      expect(result.line).toEqual([0, 0, 0, 4]);
      expect(result.score).toBe(4);
    });

    it('should slide tiles to the right', () => {
      const result = mergeLineRight([2, 0, 4, 0]);
      expect(result.line).toEqual([0, 0, 2, 4]);
      expect(result.score).toBe(0);
    });

    it('should merge multiple pairs to the right', () => {
      const result = mergeLineRight([2, 2, 4, 4]);
      expect(result.line).toEqual([0, 0, 4, 8]);
      expect(result.score).toBe(12);
    });
  });

  describe('canMergeLine', () => {
    it('should return true if tiles can merge', () => {
      expect(canMergeLine([2, 2, 0, 0])).toBe(true);
      expect(canMergeLine([2, 0, 2, 0])).toBe(true);
    });

    it('should return true if tiles can slide', () => {
      expect(canMergeLine([0, 2, 0, 0])).toBe(true);
      expect(canMergeLine([0, 0, 0, 4])).toBe(true);
    });

    it('should return false if no moves possible', () => {
      expect(canMergeLine([2, 4, 8, 16])).toBe(false);
      expect(canMergeLine([0, 0, 0, 0])).toBe(false);
    });

    it('should return true for adjacent same values', () => {
      expect(canMergeLine([2, 4, 4, 8])).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle large tile values', () => {
      const result = mergeLine([1024, 1024, 0, 0]);
      expect(result.line).toEqual([2048, 0, 0, 0]);
      expect(result.score).toBe(2048);
    });

    it('should handle mixed zeros', () => {
      const result = mergeLine([0, 2, 0, 2]);
      expect(result.line).toEqual([4, 0, 0, 0]);
      expect(result.score).toBe(4);
    });

    it('should not merge different values', () => {
      const result = mergeLine([2, 4, 8, 16]);
      expect(result.line).toEqual([2, 4, 8, 16]);
      expect(result.score).toBe(0);
    });
  });
});
