import '../styles/card.css';

function Card({ pkmnData, onCardClick }) {
  return (
    <div className='card' data-id={pkmnData.id} onClick={onCardClick}>
      <div className='card-content'>
        <img className='pkmn-sprite' src={pkmnData.image} alt='' />
        <div className='pkmn-name'>{pkmnData.name}</div>
      </div>
    </div>
  );
}

export default Card;
