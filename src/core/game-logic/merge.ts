

import type { TileValue } from './types';

type Line = TileValue[];


interface MergeResult {
  readonly line: Line;
  readonly score: number;
}


export const mergeLine = (line: readonly TileValue[]): MergeResult => {
  
  const nonZero = line.filter(val => val !== 0);
  
  const merged: TileValue[] = [];
  let score = 0;
  let i = 0;
  
  while (i < nonZero.length) {
    const current = nonZero[i];
    const next = nonZero[i + 1];
    if (current !== undefined && i + 1 < nonZero.length && current === next) {
      const mergedValue = (current * 2) as TileValue;
      merged.push(mergedValue);
      score += mergedValue;
      i += 2; 
    } else if (current !== undefined) {
      merged.push(current);
      i += 1;
    } else {
      i += 1;
    }
  }
  
  while (merged.length < line.length) {
    merged.push(0);
  }
  
  return { line: merged, score };
};


export const reverseLine = (line: readonly TileValue[]): TileValue[] => {
  return [...line].reverse();
};


export const mergeLineRight = (line: readonly TileValue[]): MergeResult => {
  const reversed = reverseLine(line);
  const result = mergeLine(reversed);
  return {
    line: reverseLine(result.line),
    score: result.score,
  };
};


export const canMergeLine = (line: readonly TileValue[]): boolean => {
  const nonZero = line.filter(val => val !== 0);
  

  if (nonZero.length < line.length && nonZero.length > 0) {
    let firstNonZeroIndex = line.findIndex(val => val !== 0);
    if (firstNonZeroIndex > 0) return true;
  }
  

  for (let i = 0; i < nonZero.length - 1; i++) {
    if (nonZero[i] === nonZero[i + 1]) {
      return true;
    }
  }
  
  return false;
};


export const wouldLineChange = (line: readonly TileValue[]): boolean => {
  const result = mergeLine(line);
  return !arraysEqual(line, result.line);
};


const arraysEqual = (a: readonly TileValue[], b: readonly TileValue[]): boolean => {
  if (a.length !== b.length) return false;
  return a.every((val, idx) => val === b[idx]);
};
