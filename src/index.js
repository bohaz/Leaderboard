import './styles.css';
import { fetchData, postData, createGame } from './module/api.js';
import { renderLeaderboard } from './module/leaderboard.js';

let gameID = null;

async function initializeGame() {
  try {
    const gameName = 'SuperHero';
    const game = await createGame(gameName);
    gameID = game.result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error al crear el juego:', error);
  }
}

async function handleRefresh() {
  if (!gameID) {
    await initializeGame();
  }

  if (gameID) {
    const scores = await fetchData(gameID);
    renderLeaderboard(scores);
  }
}

async function handleSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById('nameInput');
  const scoreInput = document.getElementById('scoreInput');

  if (!gameID) {
    await initializeGame();
  }

  const name = nameInput.value.trim();
  const score = parseInt(scoreInput.value, 10);

  // eslint-disable-next-line no-restricted-globals
  if (name === '' || isNaN(score)) {
    // eslint-disable-next-line no-alert
    alert('Please enter a valid name and score.');
    return;
  }

  await postData(gameID, name, score);

  nameInput.value = '';
  scoreInput.value = '';

  handleRefresh();
}

const refreshButton = document.getElementById('refreshButton');
const scoreForm = document.getElementById('scoreForm');

refreshButton.addEventListener('click', handleRefresh);
scoreForm.addEventListener('submit', handleSubmit);

handleRefresh();
