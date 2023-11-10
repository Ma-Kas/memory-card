import PropTypes from 'prop-types';
import Card from './Card';
import '../styles/game-loop.css';

function GameLoop({ pkmnData, onCardClick }) {
  return (
    <div className='card-container'>
      {pkmnData.map((pkmn) => (
        <Card pkmnData={pkmn} onCardClick={onCardClick} key={pkmn.id}></Card>
      ))}
    </div>
  );
}

GameLoop.propTypes = {
  pkmnData: PropTypes.array,
  onCardClick: PropTypes.func,
};

export default GameLoop;
