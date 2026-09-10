"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/database");
const User_1 = __importDefault(require("./models/User"));
const Team_1 = __importDefault(require("./models/Team"));
const Activity_1 = __importDefault(require("./models/Activity"));
const Workout_1 = __importDefault(require("./models/Workout"));
const Leaderboard_1 = __importDefault(require("./models/Leaderboard"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express_1.default.json());
app.get('/api/health', (_request, response) => {
    response.json({
        status: 'ok',
        service: 'octofit-tracker-api',
        baseUrl,
    });
});
app.get('/api/users', async (_request, response) => {
    try {
        const users = await User_1.default.find().populate('team');
        response.json(users);
    }
    catch (error) {
        response.status(500).json({ message: 'Failed to fetch users', error });
    }
});
app.post('/api/users', async (request, response) => {
    try {
        const user = await User_1.default.create(request.body);
        response.status(201).json(user);
    }
    catch (error) {
        response.status(400).json({ message: 'Failed to create user', error });
    }
});
app.get('/api/teams', async (_request, response) => {
    try {
        const teams = await Team_1.default.find().populate('members');
        response.json(teams);
    }
    catch (error) {
        response.status(500).json({ message: 'Failed to fetch teams', error });
    }
});
app.post('/api/teams', async (request, response) => {
    try {
        const team = await Team_1.default.create(request.body);
        response.status(201).json(team);
    }
    catch (error) {
        response.status(400).json({ message: 'Failed to create team', error });
    }
});
app.get('/api/activities', async (_request, response) => {
    try {
        const activities = await Activity_1.default.find().populate('user');
        response.json(activities);
    }
    catch (error) {
        response.status(500).json({ message: 'Failed to fetch activities', error });
    }
});
app.post('/api/activities', async (request, response) => {
    try {
        const activity = await Activity_1.default.create(request.body);
        response.status(201).json(activity);
    }
    catch (error) {
        response.status(400).json({ message: 'Failed to create activity', error });
    }
});
app.get('/api/workouts', async (_request, response) => {
    try {
        const workouts = await Workout_1.default.find();
        response.json(workouts);
    }
    catch (error) {
        response.status(500).json({ message: 'Failed to fetch workouts', error });
    }
});
app.post('/api/workouts', async (request, response) => {
    try {
        const workout = await Workout_1.default.create(request.body);
        response.status(201).json(workout);
    }
    catch (error) {
        response.status(400).json({ message: 'Failed to create workout', error });
    }
});
app.get('/api/leaderboard', async (_request, response) => {
    try {
        const leaderboard = await Leaderboard_1.default.find().populate('user').populate('team');
        response.json(leaderboard);
    }
    catch (error) {
        response.status(500).json({ message: 'Failed to fetch leaderboard', error });
    }
});
app.post('/api/leaderboard', async (request, response) => {
    try {
        const entry = await Leaderboard_1.default.create(request.body);
        response.status(201).json(entry);
    }
    catch (error) {
        response.status(400).json({ message: 'Failed to create leaderboard entry', error });
    }
});
app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
});
exports.default = app;
