import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApi('workouts')
      .then(setWorkouts)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div className="alert alert-danger">Error loading workouts: {error}</div>;
  }

  return (
    <div>
      <h2>Workouts</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Focus</th>
            <th>Difficulty</th>
            <th>Est. Minutes</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout._id}>
              <td>{workout.title}</td>
              <td>{workout.description}</td>
              <td>{workout.focus}</td>
              <td>{workout.difficulty}</td>
              <td>{workout.estimatedMinutes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Workouts;
