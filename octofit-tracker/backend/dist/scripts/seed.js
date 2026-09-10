"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const Team_1 = __importDefault(require("../models/Team"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Workout_1 = __importDefault(require("../models/Workout"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await User_1.default.deleteMany({});
        await Team_1.default.deleteMany({});
        await Activity_1.default.deleteMany({});
        await Workout_1.default.deleteMany({});
        await Leaderboard_1.default.deleteMany({});
        const cometCrew = await Team_1.default.create({
            name: 'Comet Crew',
            motto: 'Move together, shine together!',
            points: 190,
        });
        const stellarSquad = await Team_1.default.create({
            name: 'Stellar Squad',
            motto: 'Strong minds, strong bodies',
            points: 175,
        });
        const userOne = await User_1.default.create({
            name: 'Ava Johnson',
            email: 'ava@example.com',
            age: 16,
            fitnessLevel: 'advanced',
            team: cometCrew._id,
            totalPoints: 120,
        });
        const userTwo = await User_1.default.create({
            name: 'Leo Martinez',
            email: 'leo@example.com',
            age: 15,
            fitnessLevel: 'intermediate',
            team: cometCrew._id,
            totalPoints: 110,
        });
        const userThree = await User_1.default.create({
            name: 'Mia Chen',
            email: 'mia@example.com',
            age: 17,
            fitnessLevel: 'beginner',
            team: stellarSquad._id,
            totalPoints: 95,
        });
        await Team_1.default.updateMany({}, { $set: { members: [userOne._id, userTwo._id, userThree._id] } });
        await Activity_1.default.create({
            user: userOne._id,
            type: 'running',
            durationMinutes: 35,
            distanceKm: 5.2,
            caloriesBurned: 420,
            date: new Date(),
            notes: 'Morning 5K run',
        });
        await Activity_1.default.create({
            user: userTwo._id,
            type: 'strength',
            durationMinutes: 40,
            caloriesBurned: 340,
            date: new Date(),
            notes: 'Upper body circuit',
        });
        await Workout_1.default.create({
            title: 'Cardio Blast',
            description: 'Quick interval workout to build endurance',
            focus: 'Cardio',
            difficulty: 'intermediate',
            estimatedMinutes: 25,
            equipment: ['jump rope', 'mat'],
            isRecommendedFor: ['beginner', 'intermediate'],
        });
        await Workout_1.default.create({
            title: 'Core Power',
            description: 'A focused core and posture routine',
            focus: 'Core',
            difficulty: 'beginner',
            estimatedMinutes: 20,
            equipment: ['mat'],
            isRecommendedFor: ['beginner', 'intermediate'],
        });
        await Leaderboard_1.default.create({
            user: userOne._id,
            team: cometCrew._id,
            score: 120,
            rank: 1,
            period: 'week',
        });
        await Leaderboard_1.default.create({
            user: userTwo._id,
            team: cometCrew._id,
            score: 110,
            rank: 2,
            period: 'week',
        });
        await Leaderboard_1.default.create({
            user: userThree._id,
            team: stellarSquad._id,
            score: 95,
            rank: 3,
            period: 'week',
        });
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
