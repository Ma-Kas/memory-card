import { useState } from 'react';
import Card from './components/Card';
import './App.css';

async function getPkmnData(pkmnId) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnId}`);
  const pkmnData = await res.json();
  return pkmnData;
}

function App() {
  const [pokemon, setPokemon] = useState(null);

  return (
    <div className='main'>
      <header className='header'></header>
      <div className='main-play-area'>
        <Card></Card>
      </div>
    </div>
  );
}

export default App;
