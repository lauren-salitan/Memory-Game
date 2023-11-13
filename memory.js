const gameContainer = document.getElementById("game");
let flippedCards = [];
let lockBoard = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);

  if (lockBoard) return;
  let currentCard = event.target; //const or let?
  if (flippedCards.includes(currentCard)) return;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (flippedCards.length < 2) {
    flippedCards.push(currentCard);
  }
  
  if (flippedCards.length === 2) {
    checkForMatch();
  }
}


function checkForMatch() {
  lockBoard = true;
  
  const [card1, card2] = flippedCards;
  if (card1.classList[0] === card2.classList[0] && card1 !== card2) {
    flippedCards = []; 
    lockBoard = false; 
  } else {
    setTimeout(() => {
      card1.style.backgroundColor = '';
      card2.style.backgroundColor = '';
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}


// when the DOM loads
createDivsForColors(shuffledColors);
