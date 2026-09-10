import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

// Fetches from https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/
function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApi('leaderboard')
      .then(setEntries)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div className="alert alert-danger">Error loading leaderboard: {error}</div>;
  }

  return (
    <div>
      <h2>Leaderboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Team</th>
            <th>Score</th>
            <th>Period</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.rank}</td>
              <td>{entry.user?.name ?? '-'}</td>
              <td>{entry.team?.name ?? '-'}</td>
              <td>{entry.score}</td>
              <td>{entry.period}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
