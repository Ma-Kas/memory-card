import * as CONFIG from '../config/config.json';
import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/menus.css';

function MainMenu({ startGame }) {
  const [difficulty, setDifficulty] = useState(CONFIG.DIFFICULTY_HARD);

  const handleGameStart = () => {
    startGame(difficulty);
  };

  const handleDifficultySelection = (chosenDifficulty, e) => {
    const diffButtons = document.querySelectorAll('.btn-difficulty');

    diffButtons.forEach((btn) => {
      btn.classList.remove('bold');
    });
    e.target.classList.add('bold');
    setDifficulty(chosenDifficulty);
  };

  return (
    <div className='menus main-menu'>
      <h2 className='menu-header | bold'>What will you do?</h2>
      <section className='difficulty-section'>
        <p className='difficulty-title | bold'>Select Difficulty:</p>
        <div className='difficulty-button-container'>
          <button
            type='button'
            className='btn-difficulty btn-easy'
            onClick={(e) =>
              handleDifficultySelection(CONFIG.DIFFICULTY_EASY, e)
            }
          >
            Easy
          </button>
          <button
            type='button'
            className='btn-difficulty btn-hard bold'
            onClick={(e) =>
              handleDifficultySelection(CONFIG.DIFFICULTY_HARD, e)
            }
          >
            Hard
          </button>
          <button
            type='button'
            className='btn-difficulty btn-impossible'
            onClick={(e) =>
              handleDifficultySelection(CONFIG.DIFFICULTY_IMPOSSIBLE, e)
            }
          >
            Impossible
          </button>
        </div>
      </section>
      <button
        type='button'
        className='btn-start | bold'
        onClick={handleGameStart}
      >
        START GAME
      </button>
    </div>
  );
}

MainMenu.propTypes = {
  startGame: PropTypes.func,
};

export default MainMenu;
