import PropTypes from 'prop-types';
import '../styles/menus.css';

function EndModal({
  endCondition,
  currentScore,
  maxScore,
  onQuit,
  onPlayAgain,
}) {
  return (
    <div className='game-end-container | hidden'>
      <div className='game-end-modal'>
        <h2 className='result-header'>
          {endCondition === 'win' ? 'You win!' : 'You lose!'}
        </h2>
        <p className='result-score'>{`Your score is ${currentScore}/${maxScore}`}</p>
        <div className='result-button-container'>
          <button
            type='button'
            className='btn-again | bold'
            onClick={onPlayAgain}
          >
            Play Again
          </button>
          <button type='button' className='btn-quit | bold' onClick={onQuit}>
            Quit
          </button>
        </div>
      </div>
    </div>
  );
}

EndModal.propTypes = {
  endCondition: PropTypes.string,
  currentScore: PropTypes.number,
  maxScore: PropTypes.number,
  onQuit: PropTypes.func,
  onPlayAgain: PropTypes.func,
};

export default EndModal;
