'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const scorePlayer0 = document.getElementById('score--0');
const currentScorePlayer0 = document.getElementById('current--0');
const scorePlayer1 = document.getElementById('score--1');
const currentScorePlayer1 = document.getElementById('current--1');
const namePlayer0 = document.getElementById('name--0');
const namePlayer1 = document.getElementById('name--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores = [0,0];
let currentScore = 0;
let activePlayer = 0;
let playng = true;

// initial condicions
scorePlayer0.textContent = 0;
scorePlayer1.textContent = 0;
dice.classList.add('hidden');
namePlayer0.value = 'Player 0';
namePlayer1.value = 'Player 1';

// Rolling dice functionality
btnRoll.addEventListener('click', handleRollingDice);
btnHold.addEventListener('click', handleHoldScore);
btnNew.addEventListener('click', resetGame);

function handleRollingDice() {
  if(!playng) return;

  const diceNumber = Math.trunc(Math.random() * 6) + 1;
  dice.classList.remove('hidden');
  dice.src = `dice-${diceNumber}.png`;
  
  if(diceNumber !== 1) {
    currentScore += diceNumber;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    return;
  }
  switchPlayer();
};

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

function handleHoldScore() {
  if(!playng) return;

  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  if(scores[activePlayer] >= 100) {
    playng = false;
    dice.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    document.querySelector(`.coroa--${activePlayer}`).classList.remove('hidden');
    return;
  }

  switchPlayer();
};

 function resetGame() {
  scores = [0,0];
  currentScore = 0;
  activePlayer = 0;
  playng = true;
  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
  dice.classList.add('hidden');
 }