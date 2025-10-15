

import type { GameState, GameConfig, Direction, Board } from './types';
import { initializeBoard, hasTileValue } from './board';
import { move, canMove } from './moves';
import { spawnRandomTile } from './spawn';

export const DEFAULT_CONFIG: GameConfig = {
  size: 4,
  winningTile: 2048,
  initialTiles: 2,
};


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


export const processMove = (state: GameState, direction: Direction): GameState => {

  if (state.over) {
    return state;
  }
  

  const moveResult = move(state.board, direction);
  

  if (!moveResult.moved) {
    return state;
  }
  

  const boardWithNewTile = spawnRandomTile(moveResult.newBoard);
  

  const newScore = state.score + moveResult.scoreGain;
  const newBestScore = Math.max(newScore, state.bestScore);
  
  const has2048 = hasTileValue(boardWithNewTile, 2048);
  const won = has2048 && !state.hasSeenWinMessage;
  const hasSeenWinMessage = state.hasSeenWinMessage || has2048;
  
  const over = !canMove(boardWithNewTile);
  

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


export const isGameWon = (board: Board): boolean => {
  return hasTileValue(board, 2048);
};


export const isGameOver = (board: Board): boolean => {
  return !canMove(board);
};


const loadBestScore = (): number => {
  if (typeof window === 'undefined') return 0;
  
  try {
    const stored = localStorage.getItem('2048-best-score');
    return stored ? parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
};


const saveBestScore = (score: number): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('2048-best-score', score.toString());
  } catch {
  }
};


export const continueAfterWin = (state: GameState): GameState => {
  return {
    ...state,
    won: false,
    hasSeenWinMessage: true,
  };
};
