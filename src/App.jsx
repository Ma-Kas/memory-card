import * as CONFIG from './config/config.json';
import { useEffect, useState } from 'react';

import Pokemon from './apis/Pokemon';
import LoadingScreen from './components/LoadingScreen';
import MainMenu from './components/MainMenu';
import GameLoop from './components/GameLoop';
import EndModal from './components/EndModal';
import shuffleArray from './utils/shuffle';
import './App.css';

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function flipCards(cards) {
  cards.forEach((card) => {
    card.classList.toggle('flip');
  });
  await delay(800);
}

function App() {
  const [gameState, setGameState] = useState(CONFIG.MAIN_MENU);
  const [isLoading, setLoading] = useState(false);
  const [pokemonTeam, setPokemonTeam] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [gameResult, setGameResult] = useState();
  const { getRandomPkmnList } = Pokemon();

  // Shuffle cards after click
  useEffect(() => {
    const shuffledPokemonTeam = shuffleArray(pokemonTeam);
    setPokemonTeam([...shuffledPokemonTeam]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedCards]);

  // Create random stack of pokemon according to difficulty setting
  const createPokemon = async (amount) => {
    setGameState(CONFIG.GAME);
    setLoading(true);
    const randomPkmn = getRandomPkmnList(amount);
    setPokemonTeam(await randomPkmn);
    setLoading(false);
  };

  const handleCardClick = async (e) => {
    const idToPush = e.target.dataset['id'];
    const cards = document.querySelectorAll('.card-inner');

    await flipCards(cards);

    // Check for game end
    if (clickedCards.includes(idToPush)) {
      handleGameEnd('lose');
      return;
    }
    setClickedCards([...clickedCards, idToPush]);
    if (clickedCards.length === pokemonTeam.length - 1) {
      handleGameEnd('win');
      return;
    }

    await delay(500);
    await flipCards(cards);
  };

  const handleGameEnd = (endCondition) => {
    if (clickedCards.length > bestScore) {
      setBestScore(clickedCards.length);
    }
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
      <section className='header-section'>
        <header className='header'>
          <button
            type='button'
            onClick={() => handleQuit()}
            className='header-title'
          >
            POKEMON MEMORY
          </button>
          <div className='score-container'>
            <div className='current-score'>{`Current Score: ${clickedCards.length}`}</div>
            <div className='best-score'>{`Best Score: ${bestScore}`}</div>
          </div>
        </header>
      </section>
      <section className='main-play-section'>
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
      </section>
    </div>
  );
}

export default App;
