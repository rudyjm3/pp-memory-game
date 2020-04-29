const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;

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
}

function unFlipCards() {
  // Un lock board after cards have been flipped back over
  lockBoard = true;
  // Not a match
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    lockBoard = false;
  }, 1500);
}
cards.forEach(card => card.addEventListener('click', flipCard));
