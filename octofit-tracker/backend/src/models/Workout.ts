import mongoose, { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description: string;
  focus: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  equipment: string[];
  isRecommendedFor: string[];
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    focus: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    estimatedMinutes: {
      type: Number,
      required: true,
      min: 10,
    },
    equipment: [
      {
        type: String,
        trim: true,
      },
    ],
    isRecommendedFor: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Workout = mongoose.models.Workout || mongoose.model<IWorkout>('Workout', workoutSchema);

export default Workout;
