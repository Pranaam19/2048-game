
export type TileValue = 0 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192;


export interface Tile {
  readonly value: TileValue;
  readonly row: number;
  readonly col: number;
  readonly id: string; // Unique identifier for animation tracking
  readonly mergedFrom?: readonly [string, string]; // IDs of tiles that merged to create this
}


export type Board = ReadonlyArray<ReadonlyArray<TileValue>>;


export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export interface MoveResult {
  readonly newBoard: Board;
  readonly scoreGain: number;
  readonly moved: boolean; // Whether the board actually changed
}


export interface GameState {
  readonly board: Board;
  readonly score: number;
  readonly bestScore: number;
  readonly won: boolean; 
  readonly over: boolean; 
  readonly size: number; 
  readonly hasSeenWinMessage: boolean; 
  

  readonly moveCount: number; 
  readonly history: GameState[]; 
  readonly startTime: number; 
  readonly combo: number; 
}

export interface Position {
  readonly row: number;
  readonly col: number;
}


export interface GameConfig {
  readonly size: number;
  readonly winningTile: TileValue;
  readonly initialTiles: number;
}
