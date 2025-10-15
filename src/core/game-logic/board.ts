/**
 * Board initialization and basic operations.
 * All functions are pure (no side effects, no mutations).
 */

import type { Board, TileValue, Position } from './types';

/**
 * Creates an empty board of the specified size.
 * @param size - The size of the board (e.g., 4 for a 4x4 board)
 * @returns A new empty board filled with zeros
 */
export const createEmptyBoard = (size: number): Board => {
  return Array.from({ length: size }, () => 
    Array.from({ length: size }, () => 0 as TileValue)
  );
};

/**
 * Initializes a new game board with random starting tiles.
 * @param size - The size of the board
 * @param initialTileCount - Number of initial tiles to spawn (default: 2)
 * @returns A new board with initial tiles
 */
export const initializeBoard = (size: number, initialTileCount: number = 2): Board => {
  let board = createEmptyBoard(size);
  
  // Spawn initial tiles
  for (let i = 0; i < initialTileCount; i++) {
    const emptyPositions = getEmptyPositions(board);
    if (emptyPositions.length > 0) {
      const randomPos = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
      if (randomPos) {
        board = setTileValue(board, randomPos.row, randomPos.col, getRandomTileValue());
      }
    }
  }
  
  return board;
};

/**
 * Gets all empty positions on the board.
 * @param board - The game board
 * @returns Array of positions where the tile value is 0
 */
export const getEmptyPositions = (board: Board): Position[] => {
  const positions: Position[] = [];
  
  for (let row = 0; row < board.length; row++) {
    const currentRow = board[row];
    if (!currentRow) continue;
    for (let col = 0; col < currentRow.length; col++) {
      if (currentRow[col] === 0) {
        positions.push({ row, col });
      }
    }
  }
  
  return positions;
};

/**
 * Sets a tile value at a specific position (immutably).
 * @param board - The game board
 * @param row - Row index
 * @param col - Column index
 * @param value - The tile value to set
 * @returns A new board with the updated value
 */
export const setTileValue = (
  board: Board,
  row: number,
  col: number,
  value: TileValue
): Board => {
  return board.map((rowArray, r) =>
    r === row
      ? (rowArray.map((cell, c) => (c === col ? value : cell)) as readonly TileValue[])
      : rowArray
  ) as Board;
};

/**
 * Gets the tile value at a specific position.
 * @param board - The game board
 * @param row - Row index
 * @param col - Column index
 * @returns The tile value at the position
 */
export const getTileValue = (board: Board, row: number, col: number): TileValue => {
  return board[row]?.[col] ?? 0;
};

/**
 * Generates a random tile value (90% chance of 2, 10% chance of 4).
 * @returns Either 2 or 4
 */
export const getRandomTileValue = (): TileValue => {
  return Math.random() < 0.9 ? 2 : 4;
};

/**
 * Checks if two boards are equal.
 * @param board1 - First board
 * @param board2 - Second board
 * @returns True if boards are identical
 */
export const areBoardsEqual = (board1: Board, board2: Board): boolean => {
  if (board1.length !== board2.length) return false;
  
  for (let row = 0; row < board1.length; row++) {
    const row1 = board1[row];
    const row2 = board2[row];
    if (!row1 || !row2) return false;
    for (let col = 0; col < row1.length; col++) {
      if (row1[col] !== row2[col]) {
        return false;
      }
    }
  }
  
  return true;
};

/**
 * Checks if the board has a specific tile value.
 * @param board - The game board
 * @param targetValue - The value to search for
 * @returns True if the value exists on the board
 */
export const hasTileValue = (board: Board, targetValue: TileValue): boolean => {
  return board.some(row => row.some(cell => cell === targetValue));
};

/**
 * Clones a board (deep copy).
 * @param board - The game board
 * @returns A new board with the same values
 */
export const cloneBoard = (board: Board): Board => {
  return board.map(row => [...row]);
};
