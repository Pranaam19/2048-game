

import { describe, it, expect } from 'vitest';
import {
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  canMove,
  transposeBoard,
} from '../core/game-logic/moves';
import { createEmptyBoard, setTileValue } from '../core/game-logic/board';
import type { Board } from '../core/game-logic/types';

describe('Move Operations', () => {
  describe('moveLeft', () => {
    it('should move tiles left', () => {
      let board = createEmptyBoard(4);
      board = setTileValue(board, 0, 2, 2);
      board = setTileValue(board, 0, 3, 4);
      
      const result = moveLeft(board);
      expect(result.newBoard[0][0]).toBe(2);
      expect(result.newBoard[0][1]).toBe(4);
      expect(result.moved).toBe(true);
    });

    it('should merge tiles when moving left', () => {
      let board = createEmptyBoard(4);
      board = setTileValue(board, 0, 0, 2);
      board = setTileValue(board, 0, 1, 2);
      
      const result = moveLeft(board);
      expect(result.newBoard[0][0]).toBe(4);
      expect(result.scoreGain).toBe(4);
      expect(result.moved).toBe(true);
    });

    it('should not move if already at left', () => {
      let board = createEmptyBoard(4);
      board = setTileValue(board, 0, 0, 2);
      board = setTileValue(board, 0, 1, 4);
      
      const result = moveLeft(board);
      expect(result.moved).toBe(false);
      expect(result.scoreGain).toBe(0);
    });
  });

  describe('moveRight', () => {
    it('should move tiles right', () => {
      let board = createEmptyBoard(4);
      board = setTileValue(board, 0, 0, 2);
      board = setTileValue(board, 0, 1, 4);
      
      const result = moveRight(board);
      expect(result.newBoard[0][3]).toBe(4);
      expect(result.newBoard[0][2]).toBe(2);
      expect(result.moved).toBe(true);
    });

    it('should merge tiles when moving right', () => {
      let board = createEmptyBoard(4);
      board = setTileValue(board, 0, 2, 2);
      board = setTileValue(board, 0, 3, 2);
      
      const result = moveRight(board);
      expect(result.newBoard[0][3]).toBe(4);
      expect(result.scoreGain).toBe(4);
    });
  });

  describe('moveUp', () => {
    it('should move tiles up', () => {
      let board = createEmptyBoard(4);
      board = setTileValue(board, 2, 0, 2);
      board = setTileValue(board, 3, 0, 4);
      
      const result = moveUp(board);
      expect(result.newBoard[0][0]).toBe(2);
      expect(result.newBoard[1][0]).toBe(4);
      expect(result.moved).toBe(true);
    });

    it('should merge tiles when moving up', () => {
      let board = createEmptyBoard(4);
      board = setTileValue(board, 0, 0, 2);
      board = setTileValue(board, 1, 0, 2);
      
      const result = moveUp(board);
      expect(result.newBoard[0][0]).toBe(4);
      expect(result.scoreGain).toBe(4);
    });
  });

  describe('moveDown', () => {
    it('should move tiles down', () => {
      let board = createEmptyBoard(4);
      board = setTileValue(board, 0, 0, 2);
      board = setTileValue(board, 1, 0, 4);
      
      const result = moveDown(board);
      expect(result.newBoard[3][0]).toBe(4);
      expect(result.newBoard[2][0]).toBe(2);
      expect(result.moved).toBe(true);
    });

    it('should merge tiles when moving down', () => {
      let board = createEmptyBoard(4);
      board = setTileValue(board, 2, 0, 2);
      board = setTileValue(board, 3, 0, 2);
      
      const result = moveDown(board);
      expect(result.newBoard[3][0]).toBe(4);
      expect(result.scoreGain).toBe(4);
    });
  });

  describe('transposeBoard', () => {
    it('should transpose a board', () => {
      let board = createEmptyBoard(3);
      board = setTileValue(board, 0, 1, 2);
      board = setTileValue(board, 1, 0, 4);
      
      const transposed = transposeBoard(board);
      expect(transposed[1][0]).toBe(2);
      expect(transposed[0][1]).toBe(4);
    });

    it('should be reversible', () => {
      const board = createEmptyBoard(4);
      const transposed = transposeBoard(transposeBoard(board));
      expect(transposed).toEqual(board);
    });
  });

  describe('canMove', () => {
    it('should return true if any move is possible', () => {
      let board = createEmptyBoard(4);
      board = setTileValue(board, 0, 0, 2);
      board = setTileValue(board, 0, 1, 2);
      
      expect(canMove(board)).toBe(true);
    });

    it('should return false if no moves possible', () => {
      // Create a board with no possible moves
      const board: Board = [
        [2, 4, 2, 4],
        [4, 2, 4, 2],
        [2, 4, 2, 4],
        [4, 2, 4, 2],
      ];
      
      expect(canMove(board)).toBe(false);
    });

    it('should return true if tiles can slide', () => {
      let board = createEmptyBoard(4);
      board = setTileValue(board, 0, 1, 2);
      
      expect(canMove(board)).toBe(true);
    });

    it('should return true if tiles can merge', () => {
      let board = createEmptyBoard(4);
      board = setTileValue(board, 0, 0, 2);
      board = setTileValue(board, 0, 1, 2);
      board = setTileValue(board, 0, 2, 4);
      board = setTileValue(board, 0, 3, 8);
      
      expect(canMove(board)).toBe(true);
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle full row merge', () => {
      let board = createEmptyBoard(4);
      board = setTileValue(board, 0, 0, 2);
      board = setTileValue(board, 0, 1, 2);
      board = setTileValue(board, 0, 2, 4);
      board = setTileValue(board, 0, 3, 4);
      
      const result = moveLeft(board);
      expect(result.newBoard[0]).toEqual([4, 8, 0, 0]);
      expect(result.scoreGain).toBe(12);
    });

    it('should handle multiple rows independently', () => {
      let board = createEmptyBoard(4);
      board = setTileValue(board, 0, 0, 2);
      board = setTileValue(board, 0, 1, 2);
      board = setTileValue(board, 1, 2, 4);
      board = setTileValue(board, 1, 3, 4);
      
      const result = moveLeft(board);
      expect(result.newBoard[0][0]).toBe(4);
      expect(result.newBoard[1][0]).toBe(8);
      expect(result.scoreGain).toBe(12);
    });
  });
});
