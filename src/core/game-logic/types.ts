/**
 * Core types and interfaces for the 2048 game.
 * All types are immutable to support functional programming.
 */

/**
 * Represents a single tile value (0 means empty cell)
 */
export type TileValue = 0 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192;

/**
 * Represents a tile with its position and value
 */
export interface Tile {
  readonly value: TileValue;
  readonly row: number;
  readonly col: number;
  readonly id: string; // Unique identifier for animation tracking
  readonly mergedFrom?: readonly [string, string]; // IDs of tiles that merged to create this
}

/**
 * Represents the game board as a 2D array of tile values
 * Board[row][col] = TileValue
 */
export type Board = ReadonlyArray<ReadonlyArray<TileValue>>;

/**
 * Direction of movement
 */
export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

/**
 * Result of a move operation
 */
export interface MoveResult {
  readonly newBoard: Board;
  readonly scoreGain: number;
  readonly moved: boolean; // Whether the board actually changed
}

/**
 * Complete game state
 */
export interface GameState {
  readonly board: Board;
  readonly score: number;
  readonly bestScore: number;
  readonly won: boolean; // Show win overlay (true when 2048 first reached)
  readonly over: boolean; // No more moves possible
  readonly size: number; // Board size (typically 4)
  readonly hasSeenWinMessage: boolean; // Track if user already saw win message
}

/**
 * Position on the board
 */
export interface Position {
  readonly row: number;
  readonly col: number;
}

/**
 * Configuration for game initialization
 */
export interface GameConfig {
  readonly size: number;
  readonly winningTile: TileValue;
  readonly initialTiles: number;
}
