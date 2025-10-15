

import React from 'react';
import { Direction } from '../../core/game-logic/types';

export interface ControlsProps {
  onRestart: () => void;
  onMove?: (direction: Direction) => void;
}


export const Controls: React.FC<ControlsProps> = ({ onRestart, onMove }) => {
  return (
    <div className="controls">
      <div className="controls-header">
        <h1 className="game-title">2048</h1>
        <button className="btn btn-restart" onClick={onRestart}>
          New Game
        </button>
      </div>
      
      <div className="instructions">
        <p>
          <strong>How to play:</strong> Use arrow keys (↑ ↓ ← →) or WASD to move tiles.
          Tiles with the same number merge into one when they touch.
          Add them up to reach <strong>2048</strong>!
        </p>
      </div>

  
      {onMove && (
        <div className="direction-controls">
          <div className="direction-row">
            <button
              className="btn btn-direction"
              onClick={() => onMove(Direction.UP)}
              aria-label="Move up"
            >
              ↑
            </button>
          </div>
          <div className="direction-row">
            <button
              className="btn btn-direction"
              onClick={() => onMove(Direction.LEFT)}
              aria-label="Move left"
            >
              ←
            </button>
            <button
              className="btn btn-direction"
              onClick={() => onMove(Direction.DOWN)}
              aria-label="Move down"
            >
              ↓
            </button>
            <button
              className="btn btn-direction"
              onClick={() => onMove(Direction.RIGHT)}
              aria-label="Move right"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Controls;
