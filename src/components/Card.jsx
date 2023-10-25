import '../styles/card.css';

function Card() {
  return (
    <div className='card'>
      <div className='card-content'>
        <img
          className='pkmn-sprite'
          src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
          alt=''
        />
        <div className='pkmn-name'>Bulbasaur</div>
      </div>
    </div>
  );
}

export default Card;
