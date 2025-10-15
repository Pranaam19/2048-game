/**
 * Tile merging logic for 2048 game.
 * Implements the core merge rules: tiles with the same value merge into one.
 * Each tile can only merge once per move.
 */

import type { TileValue } from './types';

/**
 * Represents a row or column as an array of tile values.
 */
type Line = TileValue[];

/**
 * Result of merging a line.
 */
interface MergeResult {
  readonly line: Line;
  readonly score: number;
}

/**
 * Merges and slides tiles in a line to the left.
 * This is the core merge logic used by all directional moves.
 * 
 * Rules:
 * - Non-zero tiles slide to the left
 * - Adjacent tiles with the same value merge into one (value doubles)
 * - Each tile can only merge once per move
 * - Empty spaces (0) are filled on the right
 * 
 * @param line - Array of tile values
 * @returns Object with merged line and score gained
 * 
 * @example
 * mergeLine([2, 2, 4, 0]) => { line: [4, 4, 0, 0], score: 4 }
 * mergeLine([2, 2, 2, 2]) => { line: [4, 4, 0, 0], score: 8 }
 * mergeLine([2, 0, 2, 4]) => { line: [4, 4, 0, 0], score: 4 }
 */
export const mergeLine = (line: readonly TileValue[]): MergeResult => {
  // Filter out zeros (empty cells)
  const nonZero = line.filter(val => val !== 0);
  
  const merged: TileValue[] = [];
  let score = 0;
  let i = 0;
  
  while (i < nonZero.length) {
    // Check if current tile can merge with next tile
    if (i + 1 < nonZero.length && nonZero[i] === nonZero[i + 1]) {
      // Merge: double the value
      const mergedValue = (nonZero[i] * 2) as TileValue;
      merged.push(mergedValue);
      score += mergedValue;
      i += 2; // Skip both merged tiles
    } else {
      // No merge: keep the tile as is
      merged.push(nonZero[i]);
      i += 1;
    }
  }
  
  // Fill remaining spaces with zeros
  while (merged.length < line.length) {
    merged.push(0);
  }
  
  return { line: merged, score };
};

/**
 * Reverses a line (for right/down movements).
 * @param line - Array of tile values
 * @returns Reversed array
 */
export const reverseLine = (line: readonly TileValue[]): TileValue[] => {
  return [...line].reverse();
};

/**
 * Merges a line to the right (reverse, merge left, reverse back).
 * @param line - Array of tile values
 * @returns Object with merged line and score gained
 */
export const mergeLineRight = (line: readonly TileValue[]): MergeResult => {
  const reversed = reverseLine(line);
  const result = mergeLine(reversed);
  return {
    line: reverseLine(result.line),
    score: result.score,
  };
};

/**
 * Checks if a line can be merged or moved.
 * @param line - Array of tile values
 * @returns True if the line can change
 */
export const canMergeLine = (line: readonly TileValue[]): boolean => {
  const nonZero = line.filter(val => val !== 0);
  
  // Check if there are empty spaces that non-zero tiles can move into
  if (nonZero.length < line.length && nonZero.length > 0) {
    // Check if non-zero tiles are not already at the start
    let firstNonZeroIndex = line.findIndex(val => val !== 0);
    if (firstNonZeroIndex > 0) return true;
  }
  
  // Check if any adjacent tiles can merge
  for (let i = 0; i < nonZero.length - 1; i++) {
    if (nonZero[i] === nonZero[i + 1]) {
      return true;
    }
  }
  
  return false;
};

/**
 * Checks if a line would change after merging to the left.
 * @param line - Array of tile values
 * @returns True if the line would be different after merge
 */
export const wouldLineChange = (line: readonly TileValue[]): boolean => {
  const result = mergeLine(line);
  return !arraysEqual(line, result.line);
};

/**
 * Helper to check if two arrays are equal.
 */
const arraysEqual = (a: readonly TileValue[], b: readonly TileValue[]): boolean => {
  if (a.length !== b.length) return false;
  return a.every((val, idx) => val === b[idx]);
};
