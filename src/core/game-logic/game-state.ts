

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
    
    moveCount: 0,
    history: [],
    startTime: Date.now(),
    combo: 0,
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
  
  
  const newMoveCount = moveResult.moved ? state.moveCount + 1 : state.moveCount;
  
  
  const newCombo = moveResult.scoreGain > 0 ? state.combo + 1 : 0;
  
 
  const newHistory = moveResult.moved 
    ? [...state.history, state].slice(-10)
    : state.history;
  
  return {
    board: boardWithNewTile,
    score: newScore,
    bestScore: newBestScore,
    won,
    over,
    size: state.size,
    hasSeenWinMessage,
   
    moveCount: newMoveCount,
    history: newHistory,
    startTime: state.startTime,
    combo: newCombo,
  };
};


export const resetGame = (
  currentState: GameState,
  config?: Partial<GameConfig>
): GameState => {
  const newState = createInitialGameState(config);
  return {
    ...newState,
    bestScore: currentState.bestScore, 
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


export const undo = (state: GameState): GameState => {
  if (state.history.length === 0) {
    return state; 
  }
  

  const previousState = state.history[state.history.length - 1]!;
  

  const newHistory = state.history.slice(0, -1);
  
  return {
    board: previousState.board,
    score: previousState.score,
    bestScore: state.bestScore, // Preserve best score
    won: previousState.won,
    over: previousState.over,
    size: previousState.size,
    hasSeenWinMessage: previousState.hasSeenWinMessage,
    moveCount: previousState.moveCount,
    history: newHistory,
    startTime: previousState.startTime,
    combo: previousState.combo,
  };
};


export const getElapsedTime = (state: GameState): number => {
  return Math.floor((Date.now() - state.startTime) / 1000);
};


export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};


export const getComboMultiplier = (combo: number): number => {
  return Math.min(1 + combo * 0.1, 3);
};


const GAME_STATE_KEY = '2048-current-game';

export const saveGameToStorage = (state: GameState): void => {
  if (typeof window === 'undefined') return;
  
  try {
    
    const stateToSave = {
      ...state,
      history: [], 
    };
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(stateToSave));
  } catch (e) {
    console.error('Failed to save game state', e);
  }
};

export const loadGameFromStorage = (): GameState | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const saved = localStorage.getItem(GAME_STATE_KEY);
    if (!saved) return null;
    
    const state = JSON.parse(saved);
    
    if (state.board && state.score !== undefined) {
      return {
        ...state,
        history: [], 
        startTime: Date.now(), 
      };
    }
    return null;
  } catch (e) {
    console.error('Failed to load game state', e);
    return null;
  }
};

export const clearSavedGame = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(GAME_STATE_KEY);
  } catch (e) {
    console.error('Failed to clear saved game', e);
  }
};
