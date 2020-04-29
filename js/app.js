const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  // So if the same card is clicked twice it wont lock up
  if (this === firstCard) return;

  this.classList.toggle('flip');

  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  // second click
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}
// do cards match?
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
  // it's a match.
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  restBoard();
}

function unFlipCards() {
  // Un lock board after cards have been flipped back over
  lockBoard = true;
  // Not a match
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    restBoard();
  }, 1500);
}

//function restBoard() {
  //[hasFlippedCard, lockBoard] = [false, false];
  //[firstCard, secondCard] = [null, null];
//}
function restBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

(function shuffle(){
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();
cards.forEach(card => card.addEventListener('click', flipCard));
