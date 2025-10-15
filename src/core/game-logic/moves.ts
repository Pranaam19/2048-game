

import type { Board, MoveResult, TileValue } from './types';
import { Direction } from './types';
import { mergeLine, mergeLineRight } from './merge';
import { areBoardsEqual } from './board';


export const moveLeft = (board: Board): MoveResult => {
  let totalScore = 0;
  
  const newBoard = board.map(row => {
    const result = mergeLine(row);
    totalScore += result.score;
    return result.line as readonly TileValue[];
  }) as Board;
  
  return {
    newBoard,
    scoreGain: totalScore,
    moved: !areBoardsEqual(board, newBoard),
  };
};


export const moveRight = (board: Board): MoveResult => {
  let totalScore = 0;
  
  const newBoard = board.map(row => {
    const result = mergeLineRight(row);
    totalScore += result.score;
    return result.line as readonly TileValue[];
  }) as Board;
  
  return {
    newBoard,
    scoreGain: totalScore,
    moved: !areBoardsEqual(board, newBoard),
  };
};


export const moveUp = (board: Board): MoveResult => {
  const transposed = transposeBoard(board);
  const result = moveLeft(transposed);
  
  return {
    newBoard: transposeBoard(result.newBoard),
    scoreGain: result.scoreGain,
    moved: result.moved,
  };
};


export const moveDown = (board: Board): MoveResult => {
  const transposed = transposeBoard(board);
  const result = moveRight(transposed);
  
  return {
    newBoard: transposeBoard(result.newBoard),
    scoreGain: result.scoreGain,
    moved: result.moved,
  };
};


export const move = (board: Board, direction: Direction): MoveResult => {
  switch (direction) {
    case Direction.LEFT:
      return moveLeft(board);
    case Direction.RIGHT:
      return moveRight(board);
    case Direction.UP:
      return moveUp(board);
    case Direction.DOWN:
      return moveDown(board);
    default:
      return { newBoard: board, scoreGain: 0, moved: false };
  }
};


export const transposeBoard = (board: Board): Board => {
  const size = board.length;
  return Array.from({ length: size }, (_, col) =>
    Array.from({ length: size }, (_, row) => board[row]?.[col] ?? 0)
  ) as Board;
};


export const canMove = (board: Board): boolean => {
  const directions = [Direction.LEFT, Direction.RIGHT, Direction.UP, Direction.DOWN];
  
  return directions.some(direction => {
    const result = move(board, direction);
    return result.moved;
  });
};
export const canMoveInDirection = (board: Board, direction: Direction): boolean => {
  const result = move(board, direction);
  return result.moved;
};
