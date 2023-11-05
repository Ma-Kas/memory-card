import * as CONFIG from '../config/config.json';
import { useState } from 'react';
import '../styles/menus.css';

function MainMenu({ startGame }) {
  const [difficulty, setDifficulty] = useState(CONFIG.DIFFICULTY_HARD);

  const handleGameStart = () => {
    startGame(difficulty);
  };
  return (
    <div className='menus main-menu'>
      <h2 className='menu-header'>What game would you like to play?</h2>
      <div className='difficulty-selection-container'>
        <button
          type='button'
          onClick={() => setDifficulty(CONFIG.DIFFICULTY_EASY)}
        >
          Easy
        </button>
        <button
          type='button'
          onClick={() => setDifficulty(CONFIG.DIFFICULTY_HARD)}
        >
          Hard
        </button>
        <button
          type='button'
          onClick={() => setDifficulty(CONFIG.DIFFICULTY_IMPOSSIBLE)}
        >
          Impossible
        </button>
      </div>
      <button onClick={handleGameStart}>Start Game</button>
    </div>
  );
}

export default MainMenu;
