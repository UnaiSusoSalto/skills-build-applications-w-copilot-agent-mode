import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApi('teams')
      .then(setTeams)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div className="alert alert-danger">Error loading teams: {error}</div>;
  }

  return (
    <div>
      <h2>Teams</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Motto</th>
            <th>Members</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id}>
              <td>{team.name}</td>
              <td>{team.motto}</td>
              <td>{team.members?.length ?? 0}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
