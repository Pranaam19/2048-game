/**
 * Custom React hook for 2048 game state management.
 * Encapsulates all game logic and provides a clean API for components.
 */

import { useState, useCallback, useEffect } from 'react';
import type { GameState, Direction, GameConfig } from '../core/game-logic/types';
import {
  createInitialGameState,
  processMove,
  resetGame,
  continueAfterWin,
} from '../core/game-logic/game-state';
import { createKeyboardHandler } from '../utils/keyboard';

/**
 * Hook return type with game state and control functions.
 */
export interface Use2048Return {
  // Current game state
  gameState: GameState;
  
  // Control functions
  move: (direction: Direction) => void;
  restart: () => void;
  continueGame: () => void;
  
  // Computed properties
  canContinue: boolean;
}

/**
 * Custom hook for managing 2048 game state.
 * 
 * @param config - Optional game configuration
 * @returns Game state and control functions
 * 
 * @example
 * const { gameState, move, restart } = use2048({ size: 4 });
 */
export const use2048 = (config?: Partial<GameConfig>): Use2048Return => {
  // Initialize game state
  const [gameState, setGameState] = useState<GameState>(() =>
    createInitialGameState(config)
  );

  /**
   * Handles a move in the specified direction.
   */
  const move = useCallback((direction: Direction) => {
    setGameState(currentState => processMove(currentState, direction));
  }, []);

  /**
   * Restarts the game with a fresh board.
   */
  const restart = useCallback(() => {
    setGameState(currentState => resetGame(currentState, config));
  }, [config]);

  /**
   * Continues playing after winning (reaching 2048).
   */
  const continueGame = useCallback(() => {
    setGameState(currentState => continueAfterWin(currentState));
  }, []);

  /**
   * Sets up keyboard event listeners.
   */
  useEffect(() => {
    const handler = createKeyboardHandler(move);
    window.addEventListener('keydown', handler);
    
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [move]);

  /**
   * Can continue playing after winning.
   */
  const canContinue = gameState.won && !gameState.over;

  return {
    gameState,
    move,
    restart,
    continueGame,
    canContinue,
  };
};

/**
 * Hook for managing game state with custom initial state (for testing).
 */
export const use2048WithState = (initialState: GameState): Use2048Return => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const move = useCallback((direction: Direction) => {
    setGameState(currentState => processMove(currentState, direction));
  }, []);

  const restart = useCallback(() => {
    setGameState(currentState => resetGame(currentState));
  }, []);

  const continueGame = useCallback(() => {
    setGameState(currentState => continueAfterWin(currentState));
  }, []);

  useEffect(() => {
    const handler = createKeyboardHandler(move);
    window.addEventListener('keydown', handler);
    
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [move]);

  const canContinue = gameState.won && !gameState.over;

  return {
    gameState,
    move,
    restart,
    continueGame,
    canContinue,
  };
};
