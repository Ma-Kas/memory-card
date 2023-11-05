import * as CONFIG from './config/config.json';
import { useEffect, useState } from 'react';

import Pokemon from './apis/Pokemon';
import LoadingScreen from './components/LoadingScreen';
import MainMenu from './components/MainMenu';
import GameLoop from './components/GameLoop';
import EndModal from './components/EndModal';
import shuffleArray from './utils/shuffle';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(CONFIG.MAIN_MENU);
  const [isLoading, setLoading] = useState(false);
  const [pokemonTeam, setPokemonTeam] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [gameResult, setGameResult] = useState();
  const { getRandomPkmnList } = Pokemon();

  // Shuffle cards after click
  useEffect(() => {
    const shuffledPokemonTeam = shuffleArray(pokemonTeam);
    setPokemonTeam([...shuffledPokemonTeam]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedCards]);

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
      handleGameEnd('lose');
    } else {
      setClickedCards([...clickedCards, idToPush]);

      if (clickedCards.length === pokemonTeam.length - 1) {
        handleGameEnd('win');
        return;
      }
      // Flip cards around, shuffle cards, flip back
    }
  };

  const handleGameEnd = (endCondition) => {
    setGameResult(endCondition);
    const endModal = document.querySelector('.game-end-container');
    endModal.classList.remove('hidden');
  };

  const handleQuit = () => {
    setClickedCards([]);
    setPokemonTeam([]);
    setGameState(CONFIG.MAIN_MENU);
  };

  const handlePlayAgain = () => {
    setClickedCards([]);
    const endModal = document.querySelector('.game-end-container');
    endModal.classList.remove('hidden');
    createPokemon(pokemonTeam.length);
  };

  return (
    <div className='main'>
      <header className='header'>
        <div className='score'>{`Current Score: ${clickedCards.length}`}</div>
      </header>
      <div className='main-play-area'>
        {gameState === CONFIG.MAIN_MENU ? (
          <MainMenu startGame={(amount) => createPokemon(amount)}></MainMenu>
        ) : isLoading ? (
          <LoadingScreen></LoadingScreen>
        ) : (
          <>
            <EndModal
              endCondition={gameResult}
              currentScore={clickedCards.length}
              maxScore={pokemonTeam.length}
              onQuit={handleQuit}
              onPlayAgain={handlePlayAgain}
            ></EndModal>
            <GameLoop
              pkmnData={pokemonTeam}
              onCardClick={handleCardClick}
            ></GameLoop>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
