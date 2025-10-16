

import React from 'react';
import type { TileValue } from '../../core/game-logic/types';
import '../../styles/Tile.css';

export interface TileProps {
  value: TileValue;
  row: number;
  col: number;
}


const getTileClassName = (value: TileValue): string => {
  if (value === 0) return 'tile tile-empty';
  return `tile tile-${value}`;
};


export const Tile: React.FC<TileProps> = ({ value, row, col }) => {
  const className = getTileClassName(value);
  const displayValue = value === 0 ? '' : value.toString();

  return (
    <div
      className={className}
      data-row={row}
      data-col={col}
      data-value={value}
    >
      {displayValue && <span className="tile-value">{displayValue}</span>}
    </div>
  );
};

export default Tile;
