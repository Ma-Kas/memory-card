import * as CONFIG from '../config/config.json';

function Pokemon() {
  const getPkmnData = async (pkmnId) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnId}`);
    const { id, name, sprites } = await res.json();
    const image = sprites['front_default'];
    return { id, name, image };
  };

  const getRandomPkmnList = async (amount) => {
    let pkmnIdList = [];

    while (pkmnIdList.length < amount) {
      // avoid double entries in pokemon list
      let randomPkmnId = 0;
      do {
        randomPkmnId = Math.floor(Math.random() * CONFIG.MAX_PKMN_ID) + 1;
      } while (pkmnIdList.includes(randomPkmnId));

      pkmnIdList.push(randomPkmnId);
    }

    return await Promise.all(pkmnIdList.map(getPkmnData));
  };

  return { getRandomPkmnList };
}

export default Pokemon;
