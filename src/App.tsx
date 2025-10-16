
import React from 'react';
import { use2048 } from './hooks/use2048';
import { BoardView } from './ui/components/BoardView';
import { ScoreBoard } from './ui/components/ScoreBoard';
import { Controls } from './ui/components/Controls';
import { GameOverlay } from './ui/components/GameOverlay';
import './styles/global.css';


const App: React.FC = () => {
  
  const { gameState, restart, continueGame, canContinue } = use2048({
    size: 4,
    winningTile: 2048,
    initialTiles: 2,
  });

  return (
    <div className="app">
      <div className="game-container">
        <Controls onRestart={restart} />


        <ScoreBoard score={gameState.score} bestScore={gameState.bestScore} />


        <BoardView board={gameState.board} size={gameState.size} />


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
