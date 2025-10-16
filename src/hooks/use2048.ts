

import { useState, useCallback, useEffect } from 'react';
import type { GameState, Direction, GameConfig } from '../core/game-logic/types';
import {
  createInitialGameState,
  processMove,
  resetGame,
  hardResetGame,
  continueAfterWin,
  undo,
  getElapsedTime,
  saveGameToStorage,
  loadGameFromStorage,
} from '../core/game-logic/game-state';
import { createKeyboardHandler } from '../utils/keyboard';
import { getBestMove } from '../core/game-logic/ai-hints';
import { FEATURE_FLAGS } from '../config/features';


export interface Use2048Return {
  gameState: GameState;
  
  
  move: (direction: Direction) => void;
  restart: () => void;
  hardReset: () => void;
  continueGame: () => void;
  
  
  undo: () => void;
  getHint: () => Direction | null;
  elapsedTime: number;
  
  
  canContinue: boolean;
  canUndo: boolean;
}


export const use2048 = (config?: Partial<GameConfig>): Use2048Return => {
  /
  const [gameState, setGameState] = useState<GameState>(() => {
    if (FEATURE_FLAGS.enableSaveLoad) {
      const saved = loadGameFromStorage();
      if (saved) return saved;
    }
    return createInitialGameState(config);
  });
  
 
  const [elapsedTime, setElapsedTime] = useState(0);


  const move = useCallback((direction: Direction) => {
    setGameState(currentState => processMove(currentState, direction));
  }, []);


  const restart = useCallback(() => {
    setGameState(currentState => resetGame(currentState, config));
  }, [config]);

  const hardReset = useCallback(() => {
    setGameState(() => hardResetGame(config));
  }, [config]);

  const continueGame = useCallback(() => {
    setGameState(currentState => continueAfterWin(currentState));
  }, []);
  

  const undoMove = useCallback(() => {
    setGameState(currentState => undo(currentState));
  }, []);
  

  const getHint = useCallback(() => {
    return getBestMove(gameState.board);
  }, [gameState.board]);


  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
     
      const keyboardHandler = createKeyboardHandler(move);
      keyboardHandler(event);
      

      if (FEATURE_FLAGS.enableKeyboardShortcuts) {
        if (event.key.toLowerCase() === 'r') {
          event.preventDefault();
          restart();
        }
        if (event.key.toLowerCase() === 'u' && FEATURE_FLAGS.enableUndo) {
          event.preventDefault();
          undoMove();
        }
      }
    };
    
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [move, restart, undoMove]);
  
  
  useEffect(() => {
    if (!FEATURE_FLAGS.enableTimer || gameState.over) return;
    
    const interval = setInterval(() => {
      setElapsedTime(getElapsedTime(gameState));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [gameState]);
  
 
  useEffect(() => {
    if (FEATURE_FLAGS.enableSaveLoad) {
      saveGameToStorage(gameState);
    }
  }, [gameState]);

 
  const canContinue = gameState.won && !gameState.over;
  const canUndo = gameState.history.length > 0;

  return {
    gameState,
    move,
    restart,
    hardReset,
    continueGame,
    undo: undoMove,
    getHint,
    elapsedTime,
    canContinue,
    canUndo,
  };
};


export const use2048WithState = (initialState: GameState): Use2048Return => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [elapsedTime, setElapsedTime] = useState(0);

  const move = useCallback((direction: Direction) => {
    setGameState(currentState => processMove(currentState, direction));
  }, []);

  const restart = useCallback(() => {
    setGameState(currentState => resetGame(currentState));
  }, []);

  const continueGame = useCallback(() => {
    setGameState(currentState => continueAfterWin(currentState));
  }, []);

  const hardReset = useCallback(() => {
    setGameState(() => hardResetGame());
  }, []);

  const undoMove = useCallback(() => {
    setGameState(currentState => undo(currentState));
  }, []);

  const getHint = useCallback(() => {
    return getBestMove(gameState.board);
  }, [gameState.board]);

  useEffect(() => {
    const handler = createKeyboardHandler(move);
    window.addEventListener('keydown', handler);
    
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [move]);

  useEffect(() => {
    if (gameState.over) return;
    
    const interval = setInterval(() => {
      setElapsedTime(getElapsedTime(gameState));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [gameState]);

  const canContinue = gameState.won && !gameState.over;
  const canUndo = gameState.history.length > 0;

  return {
    gameState,
    move,
    restart,
    hardReset,
    continueGame,
    undo: undoMove,
    getHint,
    elapsedTime,
    canContinue,
    canUndo,
  };
};
