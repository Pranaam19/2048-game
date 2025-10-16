

import React from 'react';

export interface GameOverlayProps {
  isWon: boolean;
  isOver: boolean;
  canContinue: boolean;
  onRestart: () => void;
  onContinue?: () => void;
}


export const GameOverlay: React.FC<GameOverlayProps> = ({
  isWon,
  isOver,
  canContinue,
  onRestart,
  onContinue,
}) => {

  if (!isWon && !isOver) {
    return null;
  }

  
  if (isWon && !isOver) {
    return (
      <div className="overlay overlay-win">
        <div className="overlay-content">
          <h2 className="overlay-title">You Win! 🎉</h2>
          <p className="overlay-message">
            Congratulations! You've reached the 2048 tile!
          </p>
          <div className="overlay-buttons">
            {canContinue && onContinue && (
              <button className="btn btn-primary" onClick={onContinue}>
                Keep Playing
              </button>
            )}
            <button className="btn btn-secondary" onClick={onRestart}>
              New Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isOver) {
    return (
      <div className="overlay overlay-lose">
        <div className="overlay-content">
          <h2 className="overlay-title">Game Over!</h2>
          <p className="overlay-message">
            No more moves available. Try again!
          </p>
          <div className="overlay-buttons">
            <button className="btn btn-primary" onClick={onRestart}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default GameOverlay;
