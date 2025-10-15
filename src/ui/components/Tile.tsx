/**
 * Tile component - displays a single tile with its value.
 * Handles styling and animations based on tile value.
 */

import React from 'react';
import type { TileValue } from '../../core/game-logic/types';
import '../../styles/Tile.css';

export interface TileProps {
  value: TileValue;
  row: number;
  col: number;
}

/**
 * Gets the CSS class name for a tile based on its value.
 */
const getTileClassName = (value: TileValue): string => {
  if (value === 0) return 'tile tile-empty';
  return `tile tile-${value}`;
};

/**
 * Tile component that displays a single game tile.
 */
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
