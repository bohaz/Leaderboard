import './styles.css';
import { fetchData, postData, createGame } from './module/api.js';
import { renderLeaderboard } from './module/leaderboard.js';

let gameID = null;

const initializeGame = async () => {
  try {
    const gameName = 'SuperHero';
    const game = await createGame(gameName);
    gameID = game.result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error al crear el juego:', error);
  }
};

const handleRefresh = async () => {
  if (!gameID) {
    await initializeGame();
  }

  if (gameID) {
    const scores = await fetchData(gameID);
    renderLeaderboard(scores);
  }
};

const handleSubmit = async (event) => {
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
    alert('Por favor, ingresa un nombre y una puntuación válida.');
    return;
  }

  await postData(gameID, name, score);

  nameInput.value = '';
  scoreInput.value = '';

  handleRefresh();
};

const refreshButton = document.getElementById('refreshButton');
const scoreForm = document.getElementById('scoreForm');

refreshButton.addEventListener('click', handleRefresh);
scoreForm.addEventListener('submit', handleSubmit);

handleRefresh();
