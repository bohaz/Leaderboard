/* eslint-disable no-console */
export const fetchData = async (gameID) => {
  try {
    const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores`);
    const data = await response.json();
    return data.result || [];
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return [];
  }
};

export const postData = async (gameID, name, score) => {
  try {
    const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: name, score }),
    });

    const data = await response.json();
    console.log('Puntuación enviada:', data);
  } catch (error) {
    console.error('Error al enviar la puntuación:', error);
  }
};

export const createGame = async (gameName) => {
  try {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: gameName }),
    });

    const data = await response.json();
    console.log('Juego creado:', data);
    return data;
  } catch (error) {
    console.error('Error al crear el juego:', error);
    return null;
  }
};
