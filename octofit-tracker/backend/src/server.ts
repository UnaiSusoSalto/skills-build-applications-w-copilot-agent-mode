import cors from 'cors';
import express from 'express';
import './config/database';
import User from './models/User';
import Team from './models/Team';
import Activity from './models/Activity';
import Workout from './models/Workout';
import Leaderboard from './models/Leaderboard';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-tracker-api',
    baseUrl,
  });
});

app.get('/api/users', async (_request, response) => {
  try {
    const users = await User.find().populate('team');
    response.json(users);
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch users', error });
  }
});

app.post('/api/users', async (request, response) => {
  try {
    const user = await User.create(request.body);
    response.status(201).json(user);
  } catch (error) {
    response.status(400).json({ message: 'Failed to create user', error });
  }
});

app.get('/api/teams', async (_request, response) => {
  try {
    const teams = await Team.find().populate('members');
    response.json(teams);
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

app.post('/api/teams', async (request, response) => {
  try {
    const team = await Team.create(request.body);
    response.status(201).json(team);
  } catch (error) {
    response.status(400).json({ message: 'Failed to create team', error });
  }
});

app.get('/api/activities', async (_request, response) => {
  try {
    const activities = await Activity.find().populate('user');
    response.json(activities);
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

app.post('/api/activities', async (request, response) => {
  try {
    const activity = await Activity.create(request.body);
    response.status(201).json(activity);
  } catch (error) {
    response.status(400).json({ message: 'Failed to create activity', error });
  }
});

app.get('/api/workouts', async (_request, response) => {
  try {
    const workouts = await Workout.find();
    response.json(workouts);
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

app.post('/api/workouts', async (request, response) => {
  try {
    const workout = await Workout.create(request.body);
    response.status(201).json(workout);
  } catch (error) {
    response.status(400).json({ message: 'Failed to create workout', error });
  }
});

app.get('/api/leaderboard', async (_request, response) => {
  try {
    const leaderboard = await Leaderboard.find().populate('user').populate('team');
    response.json(leaderboard);
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

app.post('/api/leaderboard', async (request, response) => {
  try {
    const entry = await Leaderboard.create(request.body);
    response.status(201).json(entry);
  } catch (error) {
    response.status(400).json({ message: 'Failed to create leaderboard entry', error });
  }
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
  console.log(`API base URL: ${baseUrl}`);
});

export default app;