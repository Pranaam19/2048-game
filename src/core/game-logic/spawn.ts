

import type { Board } from './types';
import { getEmptyPositions, setTileValue, getRandomTileValue } from './board';


export const spawnRandomTile = (board: Board): Board => {
  const emptyPositions = getEmptyPositions(board);
  
 
  if (emptyPositions.length === 0) {
    return board;
  }
  

  const randomIndex = Math.floor(Math.random() * emptyPositions.length);
  const position = emptyPositions[randomIndex];
  

  const value = getRandomTileValue();
  

  return setTileValue(board, position.row, position.col, value);
};


export const spawnTileAt = (
  board: Board,
  row: number,
  col: number,
  value: 2 | 4
): Board => {
  return setTileValue(board, row, col, value);
};


export const hasEmptyPositions = (board: Board): boolean => {
  return getEmptyPositions(board).length > 0;
};
