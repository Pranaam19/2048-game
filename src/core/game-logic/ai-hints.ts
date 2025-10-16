

import type { Board } from './types';
import { Direction } from './types';
import { move, canMove } from './moves';
import { getEmptyPositions } from './board';


export const evaluateBoard = (board: Board): number => {
  let score = 0;

  const emptyCells = getEmptyPositions(board).length;
  score += emptyCells * 100;
  

  const maxTile = Math.max(...board.flat());
  score += maxTile * 10;
  

  score += calculateMonotonicity(board) * 50;
  

  score += calculateSmoothness(board) * 20;
  
  return score;
};

const calculateMonotonicity = (board: Board): number => {
  let mono = 0;
  const size = board.length;
  
  
  for (let row = 0; row < size; row++) {
    let increasing = 0;
    let decreasing = 0;
    for (let col = 0; col < size - 1; col++) {
      const curr = board[row]?.[col] ?? 0;
      const next = board[row]?.[col + 1] ?? 0;
      if (curr <= next) increasing++;
      if (curr >= next) decreasing++;
    }
    mono += Math.max(increasing, decreasing);
  }
  
  
  for (let col = 0; col < size; col++) {
    let increasing = 0;
    let decreasing = 0;
    for (let row = 0; row < size - 1; row++) {
      const curr = board[row]?.[col] ?? 0;
      const next = board[row + 1]?.[col] ?? 0;
      if (curr <= next) increasing++;
      if (curr >= next) decreasing++;
    }
    mono += Math.max(increasing, decreasing);
  }
  
  return mono;
};


const calculateSmoothness = (board: Board): number => {
  let smoothness = 0;
  const size = board.length;
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const value = board[row]?.[col];
      if (!value) continue;
      
 
      if (col < size - 1) {
        const rightValue = board[row]?.[col + 1];
        if (rightValue) {
          smoothness -= Math.abs(Math.log2(value) - Math.log2(rightValue));
        }
      }
      
 
      if (row < size - 1) {
        const downValue = board[row + 1]?.[col];
        if (downValue) {
          smoothness -= Math.abs(Math.log2(value) - Math.log2(downValue));
        }
      }
    }
  }
  
  return smoothness;
};


export const getBestMove = (board: Board): Direction | null => {
  if (!canMove(board)) {
    return null; 
  }
  
  const directions = [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT];
  let bestDirection: Direction | null = null;
  let bestScore = -Infinity;
  
  for (const direction of directions) {
    const result = move(board, direction);
    
    if (result.moved) {
      const score = evaluateBoard(result.newBoard);
      
      if (score > bestScore) {
        bestScore = score;
        bestDirection = direction;
      }
    }
  }
  
  return bestDirection;
};


export const getHintText = (board: Board): string => {
  const bestMove = getBestMove(board);
  
  if (!bestMove) {
    return 'No moves available';
  }
  
  const directionText = {
    [Direction.UP]: '↑ UP',
    [Direction.DOWN]: '↓ DOWN',
    [Direction.LEFT]: '← LEFT',
    [Direction.RIGHT]: '→ RIGHT',
  };
  
  return `Try: ${directionText[bestMove]}`;
};
