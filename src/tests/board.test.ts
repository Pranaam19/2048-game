
import { describe, it, expect } from 'vitest';
import {
  createEmptyBoard,
  initializeBoard,
  getEmptyPositions,
  setTileValue,
  getTileValue,
  areBoardsEqual,
  hasTileValue,
} from '../core/game-logic/board';

describe('Board Operations', () => {
  describe('createEmptyBoard', () => {
    it('should create a board of the specified size', () => {
      const board = createEmptyBoard(4);
      expect(board).toHaveLength(4);
      expect(board[0]).toHaveLength(4);
    });

    it('should initialize all cells to 0', () => {
      const board = createEmptyBoard(4);
      board.forEach(row => {
        row.forEach(cell => {
          expect(cell).toBe(0);
        });
      });
    });

    it('should create boards of different sizes', () => {
      const board3 = createEmptyBoard(3);
      const board5 = createEmptyBoard(5);
      expect(board3).toHaveLength(3);
      expect(board5).toHaveLength(5);
    });
  });

  describe('initializeBoard', () => {
    it('should create a board with initial tiles', () => {
      const board = initializeBoard(4, 2);
      const nonZeroCells = board.flat().filter(cell => cell !== 0);
      expect(nonZeroCells).toHaveLength(2);
    });

    it('should only spawn 2 or 4 tiles', () => {
      const board = initializeBoard(4, 2);
      board.forEach(row => {
        row.forEach(cell => {
          expect([0, 2, 4]).toContain(cell);
        });
      });
    });
  });

  describe('getEmptyPositions', () => {
    it('should return all positions for empty board', () => {
      const board = createEmptyBoard(4);
      const positions = getEmptyPositions(board);
      expect(positions).toHaveLength(16);
    });

    it('should return correct positions for partially filled board', () => {
      let board = createEmptyBoard(4);
      board = setTileValue(board, 0, 0, 2);
      board = setTileValue(board, 1, 1, 4);
      
      const positions = getEmptyPositions(board);
      expect(positions).toHaveLength(14);
    });

    it('should return empty array for full board', () => {
      let board = createEmptyBoard(2);
      board = setTileValue(board, 0, 0, 2);
      board = setTileValue(board, 0, 1, 2);
      board = setTileValue(board, 1, 0, 2);
      board = setTileValue(board, 1, 1, 2);
      
      const positions = getEmptyPositions(board);
      expect(positions).toHaveLength(0);
    });
  });

  describe('setTileValue', () => {
    it('should set tile value immutably', () => {
      const board = createEmptyBoard(4);
      const newBoard = setTileValue(board, 0, 0, 2);
      
      expect(board[0][0]).toBe(0); // Original unchanged
      expect(newBoard[0][0]).toBe(2); // New board updated
    });

    it('should only change the specified cell', () => {
      const board = createEmptyBoard(4);
      const newBoard = setTileValue(board, 2, 3, 4);
      
      expect(newBoard[2][3]).toBe(4);
      expect(getEmptyPositions(newBoard)).toHaveLength(15);
    });
  });

  describe('getTileValue', () => {
    it('should get correct tile value', () => {
      let board = createEmptyBoard(4);
      board = setTileValue(board, 1, 2, 8);
      
      expect(getTileValue(board, 1, 2)).toBe(8);
      expect(getTileValue(board, 0, 0)).toBe(0);
    });

    it('should return 0 for out of bounds', () => {
      const board = createEmptyBoard(4);
      expect(getTileValue(board, 10, 10)).toBe(0);
    });
  });

  describe('areBoardsEqual', () => {
    it('should return true for identical boards', () => {
      const board1 = createEmptyBoard(4);
      const board2 = createEmptyBoard(4);
      expect(areBoardsEqual(board1, board2)).toBe(true);
    });

    it('should return false for different boards', () => {
      const board1 = createEmptyBoard(4);
      const board2 = setTileValue(board1, 0, 0, 2);
      expect(areBoardsEqual(board1, board2)).toBe(false);
    });

    it('should return false for different sizes', () => {
      const board1 = createEmptyBoard(4);
      const board2 = createEmptyBoard(5);
      expect(areBoardsEqual(board1, board2)).toBe(false);
    });
  });

  describe('hasTileValue', () => {
    it('should find existing tile value', () => {
      let board = createEmptyBoard(4);
      board = setTileValue(board, 2, 2, 2048);
      
      expect(hasTileValue(board, 2048)).toBe(true);
    });

    it('should return false for non-existent value', () => {
      const board = createEmptyBoard(4);
      expect(hasTileValue(board, 2048)).toBe(false);
    });
  });
});
