
import React, { useEffect, useRef } from 'react';
import { use2048 } from './hooks/use2048';
import { BoardView } from './ui/components/BoardView';
import { ScoreBoard } from './ui/components/ScoreBoard';
import { Controls } from './ui/components/Controls';
import { GameOverlay } from './ui/components/GameOverlay';
import { Direction } from './core/game-logic/types';
import './styles/global.css';


const App: React.FC = () => {
  
  const { gameState, move, restart, continueGame, canContinue } = use2048({
    size: 4,
    winningTile: 2048,
    initialTiles: 2,
  });

  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    const gameContainer = gameContainerRef.current;
    if (!gameContainer) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const minSwipeDistance = 30;

    const handleTouchStart = (e: Event) => {
      const touchEvent = e as TouchEvent;
      if (!touchEvent.touches[0]) return;
      touchStartX = touchEvent.touches[0].clientX;
      touchStartY = touchEvent.touches[0].clientY;
    };

    const handleTouchMove = (e: Event) => {
      const touchEvent = e as TouchEvent;
      if (!touchEvent.touches[0]) return;
      touchEndX = touchEvent.touches[0].clientX;
      touchEndY = touchEvent.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      if (Math.max(absDeltaX, absDeltaY) < minSwipeDistance) {
        return;
      }

      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0) {
          move(Direction.RIGHT);
        } else {
          move(Direction.LEFT);
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          move(Direction.DOWN);
        } else {
          move(Direction.UP);
        }
      }
    };

    gameContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    gameContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
    gameContainer.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      gameContainer.removeEventListener('touchstart', handleTouchStart);
      gameContainer.removeEventListener('touchmove', handleTouchMove);
      gameContainer.removeEventListener('touchend', handleTouchEnd);
    };
  }, [move]);

  return (
    <div className="app">
      <div className="game-container" ref={gameContainerRef}>
        <Controls onRestart={restart} />


        <ScoreBoard score={gameState.score} bestScore={gameState.bestScore} />


        <BoardView board={gameState.board} size={gameState.size} />

        {/* Mobile direction controls - only visible on mobile */}
        <div className="direction-controls">
          <div className="direction-row">
            <button
              className="btn btn-direction"
              onClick={() => move(Direction.UP)}
              aria-label="Move up"
            >
              ↑
            </button>
          </div>
          <div className="direction-row">
            <button
              className="btn btn-direction"
              onClick={() => move(Direction.LEFT)}
              aria-label="Move left"
            >
              ←
            </button>
            <button
              className="btn btn-direction"
              onClick={() => move(Direction.DOWN)}
              aria-label="Move down"
            >
              ↓
            </button>
            <button
              className="btn btn-direction"
              onClick={() => move(Direction.RIGHT)}
              aria-label="Move right"
            >
              →
            </button>
          </div>
        </div>

        <GameOverlay
          isWon={gameState.won}
          isOver={gameState.over}
          canContinue={canContinue}
          onRestart={restart}
          onContinue={continueGame}
        />
      </div>

      <footer className="footer">
        <p>
          Created with React + TypeScript | Use arrow keys or WASD to play
        </p>
      </footer>
    </div>
  );
};

export default App;
