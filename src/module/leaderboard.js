// eslint-disable-next-line import/prefer-default-export
export const renderLeaderboard = (scores) => {
  const leaderboardBody = document.getElementById('leaderboardBody');
  leaderboardBody.innerHTML = '';

  scores.forEach((score) => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const scoreCell = document.createElement('td');

    nameCell.textContent = score.user;
    scoreCell.textContent = score.score;

    row.appendChild(nameCell);
    row.appendChild(scoreCell);

    leaderboardBody.appendChild(row);
  });
};
