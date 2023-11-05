// Shuffle array using Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  let arrayToShuffle = structuredClone(array);
  for (let i = arrayToShuffle.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    let temp = arrayToShuffle[i];
    arrayToShuffle[i] = arrayToShuffle[j];
    arrayToShuffle[j] = temp;
  }
  return arrayToShuffle;
}

export default shuffleArray;
