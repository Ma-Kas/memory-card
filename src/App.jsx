import * as CONFIG from './config/config.json';
import { useState } from 'react';

import Pokemon from './apis/Pokemon';
import LoadingScreen from './components/LoadingScreen';
import MainMenu from './components/MainMenu';
import GameLoop from './components/GameLoop';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(CONFIG.MAIN_MENU);
  const [isLoading, setLoading] = useState(false);
  const [pokemonTeam, setPokemonTeam] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const { getRandomPkmnList } = Pokemon();

  const createPokemon = async (amount) => {
    setGameState(CONFIG.GAME);
    setLoading(true);
    const randomPkmn = getRandomPkmnList(amount);
    setPokemonTeam(await randomPkmn);
    setLoading(false);
  };

  const handleCardClick = (e) => {
    const idToPush = e.target.dataset['id'];
    if (clickedCards.includes(idToPush)) {
      console.log('you lose');
      // Popup Lose Modal
    } else {
      setClickedCards([...clickedCards, idToPush]);
      console.log('added');
      // Increment score
      // Flip cards around, shuffle cards, flip back
    }
  };

  return (
    <div className='main'>
      <header className='header'></header>
      <div className='main-play-area'>
        {gameState === CONFIG.MAIN_MENU ? (
          <MainMenu startGame={(amount) => createPokemon(amount)}></MainMenu>
        ) : isLoading ? (
          <LoadingScreen></LoadingScreen>
        ) : (
          <GameLoop
            pkmnData={pokemonTeam}
            onCardClick={handleCardClick}
          ></GameLoop>
        )}
      </div>
    </div>
  );
}

export default App;
