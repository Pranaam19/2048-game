

import React from 'react';
import type { Board, TileValue } from '../../core/game-logic/types';
import { Tile } from './Tile';
import '../../styles/Board.css';

export interface BoardViewProps {
  board: Board;
  size: number;
}


export const BoardView: React.FC<BoardViewProps> = ({ board, size }) => {
  if (!board || !Array.isArray(board)) {
    return <div className="board-container">Loading...</div>;
  }

  return (
    <div className="board-container">
      <div 
        className="board" 
        style={{
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          gridTemplateRows: `repeat(${size}, 1fr)`,
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((value: TileValue, colIndex: number) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              value={value}
              row={rowIndex}
              col={colIndex}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BoardView;
