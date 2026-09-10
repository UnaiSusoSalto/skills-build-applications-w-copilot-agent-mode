// Seed the octofit_db database with test data
import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Workout from '../models/Workout';
import Leaderboard from '../models/Leaderboard';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
 
async function seedDatabase() {
  try {
    console.log('Seed the octofit_db database with test data');
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Workout.deleteMany({});
    await Leaderboard.deleteMany({});

    const cometCrew = await Team.create({
      name: 'Comet Crew',
      motto: 'Move together, shine together!',
      points: 190,
    });

    const stellarSquad = await Team.create({
      name: 'Stellar Squad',
      motto: 'Strong minds, strong bodies',
      points: 175,
    });

    const userOne = await User.create({
      name: 'Ava Johnson',
      email: 'ava@example.com',
      age: 16,
      fitnessLevel: 'advanced',
      team: cometCrew._id,
      totalPoints: 120,
    });

    const userTwo = await User.create({
      name: 'Leo Martinez',
      email: 'leo@example.com',
      age: 15,
      fitnessLevel: 'intermediate',
      team: cometCrew._id,
      totalPoints: 110,
    });

    const userThree = await User.create({
      name: 'Mia Chen',
      email: 'mia@example.com',
      age: 17,
      fitnessLevel: 'beginner',
      team: stellarSquad._id,
      totalPoints: 95,
    });

    await Team.updateMany(
      {},
      { $set: { members: [userOne._id, userTwo._id, userThree._id] } },
    );

    await Activity.create({
      user: userOne._id,
      type: 'running',
      durationMinutes: 35,
      distanceKm: 5.2,
      caloriesBurned: 420,
      date: new Date(),
      notes: 'Morning 5K run',
    });

    await Activity.create({
      user: userTwo._id,
      type: 'strength',
      durationMinutes: 40,
      caloriesBurned: 340,
      date: new Date(),
      notes: 'Upper body circuit',
    });

    await Workout.create({
      title: 'Cardio Blast',
      description: 'Quick interval workout to build endurance',
      focus: 'Cardio',
      difficulty: 'intermediate',
      estimatedMinutes: 25,
      equipment: ['jump rope', 'mat'],
      isRecommendedFor: ['beginner', 'intermediate'],
    });

    await Workout.create({
      title: 'Core Power',
      description: 'A focused core and posture routine',
      focus: 'Core',
      difficulty: 'beginner',
      estimatedMinutes: 20,
      equipment: ['mat'],
      isRecommendedFor: ['beginner', 'intermediate'],
    });

    await Leaderboard.create({
      user: userOne._id,
      team: cometCrew._id,
      score: 120,
      rank: 1,
      period: 'week',
    });

    await Leaderboard.create({
      user: userTwo._id,
      team: cometCrew._id,
      score: 110,
      rank: 2,
      period: 'week',
    });

    await Leaderboard.create({
      user: userThree._id,
      team: stellarSquad._id,
      score: 95,
      rank: 3,
      period: 'week',
    });

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
