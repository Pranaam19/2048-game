

import { describe, it, expect, beforeEach } from 'vitest';
import {
  createInitialGameState,
  processMove,
  resetGame,
  isGameWon,
  isGameOver,
} from '../core/game-logic/game-state';
import { Direction } from '../core/game-logic/types';
import { setTileValue, createEmptyBoard } from '../core/game-logic/board';

describe('Game State Management', () => {
  beforeEach(() => {
    const localStorageMock = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  });

  describe('createInitialGameState', () => {
    it('should create initial state with default config', () => {
      const state = createInitialGameState();
      
      expect(state.size).toBe(4);
      expect(state.score).toBe(0);
      expect(state.won).toBe(false);
      expect(state.over).toBe(false);
      expect(state.board).toHaveLength(4);
    });

    it('should create state with custom config', () => {
      const state = createInitialGameState({ size: 5 });
      expect(state.size).toBe(5);
      expect(state.board).toHaveLength(5);
    });

    it('should spawn initial tiles', () => {
      const state = createInitialGameState();
      const nonZeroCells = state.board.flat().filter(cell => cell !== 0);
      expect(nonZeroCells.length).toBeGreaterThan(0);
    });
  });

  describe('processMove', () => {
    it('should update board after valid move', () => {
      let state = createInitialGameState();
      state = {
        ...state,
        board: setTileValue(createEmptyBoard(4), 0, 1, 2),
      };
      
      const newState = processMove(state, Direction.LEFT);
      expect(newState.board[0]?.[0]).toBe(2);
    });

    it('should increase score on merge', () => {
      let state = createInitialGameState();
      let board = createEmptyBoard(4);
      board = setTileValue(board, 0, 0, 2);
      board = setTileValue(board, 0, 1, 2);
      state = { ...state, board };
      
      const newState = processMove(state, Direction.LEFT);
      expect(newState.score).toBe(4);
    });

    it('should not change state on invalid move', () => {
      let state = createInitialGameState();
      let board = createEmptyBoard(4);
      board = setTileValue(board, 0, 0, 2);
      state = { ...state, board };
      
      const newState = processMove(state, Direction.LEFT);
      expect(newState).toBe(state);   
    });

    it('should spawn new tile after valid move', () => {
      let state = createInitialGameState();
      let board = createEmptyBoard(4);
      board = setTileValue(board, 0, 1, 2);
      state = { ...state, board };
      
      const newState = processMove(state, Direction.LEFT);
      const nonZeroCells = newState.board.flat().filter(cell => cell !== 0);
      expect(nonZeroCells.length).toBe(2); 
    });

    it('should detect win condition', () => {
      let state = createInitialGameState();
      let board = createEmptyBoard(4);
      board = setTileValue(board, 0, 0, 1024);
      board = setTileValue(board, 0, 1, 1024);
      state = { ...state, board };
      
      const newState = processMove(state, Direction.LEFT);
      expect(newState.won).toBe(true);
    });

    it('should not allow moves when game is over', () => {
      let state = createInitialGameState();
      state = { ...state, over: true };
      
      const newState = processMove(state, Direction.LEFT);
      expect(newState).toBe(state);
    });
  });

  describe('resetGame', () => {
    it('should create new game state', () => {
      const state = createInitialGameState();
      const modifiedState = { ...state, score: 100, won: true };
      
      const newState = resetGame(modifiedState);
      expect(newState.score).toBe(0);
      expect(newState.won).toBe(false);
    });

    it('should preserve best score', () => {
      const state = createInitialGameState();
      const modifiedState = { ...state, score: 100, bestScore: 200 };
      
      const newState = resetGame(modifiedState);
      expect(newState.bestScore).toBe(200);
    });
  });

  describe('isGameWon', () => {
    it('should return true when 2048 tile exists', () => {
      let board = createEmptyBoard(4);
      board = setTileValue(board, 0, 0, 2048);
      
      expect(isGameWon(board)).toBe(true);
    });

    it('should return false when 2048 tile does not exist', () => {
      let board = createEmptyBoard(4);
      board = setTileValue(board, 0, 0, 1024);
      
      expect(isGameWon(board)).toBe(false);
    });
  });

  describe('isGameOver', () => {
    it('should return false when moves are possible', () => {
      let board = createEmptyBoard(4);
      board = setTileValue(board, 0, 0, 2);
      
      expect(isGameOver(board)).toBe(false);
    });

    it('should return true when no moves possible', () => {
      let board = createEmptyBoard(4);
      board = setTileValue(board, 0, 0, 2);
      board = setTileValue(board, 0, 1, 4);
      board = setTileValue(board, 0, 2, 2);
      board = setTileValue(board, 0, 3, 4);
      board = setTileValue(board, 1, 0, 4);
      board = setTileValue(board, 1, 1, 2);
      board = setTileValue(board, 1, 2, 4);
      board = setTileValue(board, 1, 3, 2);
      board = setTileValue(board, 2, 0, 2);
      board = setTileValue(board, 2, 1, 4);
      board = setTileValue(board, 2, 2, 2);
      board = setTileValue(board, 2, 3, 4);
      board = setTileValue(board, 3, 0, 4);
      board = setTileValue(board, 3, 1, 2);
      board = setTileValue(board, 3, 2, 4);
      board = setTileValue(board, 3, 3, 2);
      
      expect(isGameOver(board)).toBe(true);
    });

    it('should return false when merges are possible', () => {
      let board = createEmptyBoard(4);
      board = setTileValue(board, 0, 0, 2);
      board = setTileValue(board, 0, 1, 2);
      board = setTileValue(board, 0, 2, 4);
      board = setTileValue(board, 0, 3, 8);
      board = setTileValue(board, 1, 0, 4);
      board = setTileValue(board, 1, 1, 8);
      board = setTileValue(board, 1, 2, 16);
      board = setTileValue(board, 1, 3, 32);
      board = setTileValue(board, 2, 0, 8);
      board = setTileValue(board, 2, 1, 16);
      board = setTileValue(board, 2, 2, 32);
      board = setTileValue(board, 2, 3, 64);
      board = setTileValue(board, 3, 0, 16);
      board = setTileValue(board, 3, 1, 32);
      board = setTileValue(board, 3, 2, 64);
      board = setTileValue(board, 3, 3, 128);
      
      expect(isGameOver(board)).toBe(false);
    });
  });
});
