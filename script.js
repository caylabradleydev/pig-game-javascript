'use strict';

//Elements
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');

let scores, startingScore, currentScore, activePlayer, playing;

const init = () => {
  playing = true;

  startingScore = 0;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0Element.textContent = startingScore;
  score1Element.textContent = startingScore;
  current0Element.textContent = startingScore;
  current1Element.textContent = startingScore;

  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};
init();

//Switch Player Functionality
const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

//Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (!playing) return;
  //Generate Random Dice Roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  //Display Dice
  diceElement.classList.remove('hidden');
  diceElement.src = `img/dice-${dice}.png`;

  //Check for rolled 1: if true switch to next player and make score 0
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

//Hold Score Functionality
btnHold.addEventListener('click', function () {
  if (!playing) return;

  //add current score to score of active player
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    playing = false;
    diceElement.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else switchPlayer();
});

//New Game Functionality
btnNew.addEventListener('click', init);
