/* eslint-disable no-console */
export async function fetchData(gameID) {
  try {
    const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores`);
    const data = await response.json();
    return data.result || [];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export async function postData(gameID, name, score) {
  try {
    const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameID}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: name, score }),
    });

    const data = await response.json();
    console.log('Score submitted:', data);
  } catch (error) {
    console.error('Error submitting score:', error);
  }
}

export async function createGame(gameName) {
  try {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: gameName }),
    });

    const data = await response.json();
    console.log('Game created:', data);
    return data;
  } catch (error) {
    console.error('Error creating game:', error);
    return null;
  }
}
