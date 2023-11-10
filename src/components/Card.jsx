import PropTypes from 'prop-types';
import '../styles/card.css';

function Card({ pkmnData, onCardClick }) {
  return (
    <div className='card'>
      <div className='card-inner' data-id={pkmnData.id} onClick={onCardClick}>
        <div className='card-front'>
          <img className='pkmn-sprite' src={pkmnData.image} alt='' />
          <div className='pkmn-name'>{pkmnData.name}</div>
        </div>
        <div className='card-back'></div>
      </div>
    </div>
  );
}

Card.propTypes = {
  pkmnData: PropTypes.object,
  onCardClick: PropTypes.func,
};

export default Card;
