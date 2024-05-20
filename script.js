'use strict';
/*
                    // Change text Content Of Score Class
const scores = document.querySelectorAll('.score');
for (let i = 0; i < scores.length; i++){
  scores[i].textContent = 0;
}
*/

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let currentScore0 = document.querySelector('#current--0');
let currentScore1 = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// Select Scores Elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // New Way To Select Id

// Change Content Of Scores Elements
score0El.textContent = 0;
score1El.textContent = 0;
//diceEl.classList.add('hidden'); //This Is Equal To  -> dice.style.display = 'none';
let scores, currentScore, activePlayer, playing;
const initialState = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score1El.textContent = 0;
  score0El.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
initialState();
const switchToNextPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active'); // toggle Check If The Class Found it Will Remove Him  And if It Not Found It Will Add Him
  player1El.classList.toggle('player--active');
};
// Implimenting Roll Dice Button Function
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1 - Generating Random Roll Dice
    let dice = Math.trunc(Math.random() * 6) + 1;

    // 2 - Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3 - Check If Dice 1 ?
    if (dice !== 1) {
      //Add Dice To Current Score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch To Next Player
      switchToNextPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //  1 - Add Current Score To Total Score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //  2 - Check If Total Score Is Equal 100
    if (scores[activePlayer] >= 100) {
      // finish The Game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner .name');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //  3 - Switch Player
      switchToNextPlayer();
    }
  }
});

btnNew.addEventListener('click', initialState);
