

import React from 'react';

export interface ScoreBoardProps {
  score: number;
  bestScore: number;
}


export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, bestScore }) => {
  return (
    <div className="score-container">
      <div className="score-box">
        <div className="score-label">Score</div>
        <div className="score-value">{score}</div>
      </div>
      <div className="score-box">
        <div className="score-label">Best</div>
        <div className="score-value">{bestScore}</div>
      </div>
    </div>
  );
};

export default ScoreBoard;
