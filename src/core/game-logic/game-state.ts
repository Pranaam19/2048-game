/**
 * Game state management logic.
 * Handles game initialization, state updates, win/lose conditions.
 */

import type { GameState, GameConfig, Direction, Board } from './types';
import { initializeBoard, hasTileValue } from './board';
import { move, canMove } from './moves';
import { spawnRandomTile } from './spawn';

/**
 * Default game configuration.
 */
export const DEFAULT_CONFIG: GameConfig = {
  size: 4,
  winningTile: 2048,
  initialTiles: 2,
};

/**
 * Creates a new game state with initialized board.
 * @param config - Game configuration (optional)
 * @returns Initial game state
 */
export const createInitialGameState = (
  config: Partial<GameConfig> = {}
): GameState => {
  const fullConfig = { ...DEFAULT_CONFIG, ...config };
  const board = initializeBoard(fullConfig.size, fullConfig.initialTiles);
  
  return {
    board,
    score: 0,
    bestScore: loadBestScore(),
    won: false,
    over: false,
    size: fullConfig.size,
    hasSeenWinMessage: false,
  };
};

/**
 * Processes a move and updates the game state.
 * @param state - Current game state
 * @param direction - Direction to move
 * @returns New game state after the move
 */
export const processMove = (state: GameState, direction: Direction): GameState => {
  // Game is over, no moves allowed
  if (state.over) {
    return state;
  }
  
  // Attempt the move
  const moveResult = move(state.board, direction);
  
  // Board didn't change, return same state
  if (!moveResult.moved) {
    return state;
  }
  
  // Spawn new tile on the updated board
  const boardWithNewTile = spawnRandomTile(moveResult.newBoard);
  
  // Calculate new score
  const newScore = state.score + moveResult.scoreGain;
  const newBestScore = Math.max(newScore, state.bestScore);
  
  // Check win condition (reached 2048)
  // Only show win overlay if user hasn't seen it before
  const has2048 = hasTileValue(boardWithNewTile, 2048);
  const won = has2048 && !state.hasSeenWinMessage;
  const hasSeenWinMessage = state.hasSeenWinMessage || has2048;
  
  // Check game over condition (no more moves possible)
  const over = !canMove(boardWithNewTile);
  
  // Save best score
  if (newBestScore > state.bestScore) {
    saveBestScore(newBestScore);
  }
  
  return {
    board: boardWithNewTile,
    score: newScore,
    bestScore: newBestScore,
    won,
    over,
    size: state.size,
    hasSeenWinMessage,
  };
};

/**
 * Resets the game to initial state.
 * @param currentState - Current game state (to preserve best score)
 * @param config - Optional new configuration
 * @returns New initial game state
 */
export const resetGame = (
  currentState: GameState,
  config?: Partial<GameConfig>
): GameState => {
  const newState = createInitialGameState(config);
  return {
    ...newState,
    bestScore: currentState.bestScore, // Preserve best score
  };
};

/**
 * Checks if the game is won (2048 tile reached).
 * @param board - The game board
 * @returns True if 2048 tile exists
 */
export const isGameWon = (board: Board): boolean => {
  return hasTileValue(board, 2048);
};

/**
 * Checks if the game is over (no moves possible).
 * @param board - The game board
 * @returns True if no moves are possible
 */
export const isGameOver = (board: Board): boolean => {
  return !canMove(board);
};

/**
 * Loads the best score from localStorage.
 * @returns Best score or 0 if not found
 */
const loadBestScore = (): number => {
  if (typeof window === 'undefined') return 0;
  
  try {
    const stored = localStorage.getItem('2048-best-score');
    return stored ? parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
};

/**
 * Saves the best score to localStorage.
 * @param score - Score to save
 */
const saveBestScore = (score: number): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('2048-best-score', score.toString());
  } catch {
    // Ignore localStorage errors
  }
};

/**
 * Continues playing after winning (allows reaching higher tiles).
 * @param state - Current game state
 * @returns New state with won flag cleared but game continues
 */
export const continueAfterWin = (state: GameState): GameState => {
  return {
    ...state,
    won: false, // Clear win flag to hide overlay but keep playing
    hasSeenWinMessage: true, // Mark that user has seen the win message
  };
};
