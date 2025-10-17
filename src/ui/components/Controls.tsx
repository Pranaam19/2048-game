

import React from 'react';

export interface ControlsProps {
  onRestart: () => void;
  onHardReset?: () => void;
}


export const Controls: React.FC<ControlsProps> = ({ onRestart, onHardReset }) => {
  return (
    <div className="controls">
      <div className="controls-header">
        <h1 className="game-title">2048</h1>
        <div className="button-group">
          <button className="btn btn-restart" onClick={onRestart}>
            New Game
          </button>
          {onHardReset && (
            <button className="btn btn-secondary" onClick={onHardReset} title="Clear best score and restart">
              Reset
            </button>
          )}
        </div>
      </div>
      
      <div className="instructions">
        <p>
          <strong>How to play:</strong> Use arrow keys, WASD, or <strong>swipe on mobile</strong> to move tiles.
          Tiles with the same number merge into one when they touch.
          Add them up to reach <strong>2048</strong>!
        </p>
      </div>
    </div>
  );
};

export default Controls;
