import mongoose, { Schema, type Document, type Types } from 'mongoose';

export interface IActivity extends Document {
  user: Types.ObjectId;
  type: 'running' | 'walking' | 'strength' | 'cycling' | 'swimming';
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned: number;
  date: Date;
  notes?: string;
}

const activitySchema = new Schema<IActivity>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['running', 'walking', 'strength', 'cycling', 'swimming'],
      required: true,
    },
    durationMinutes: {
      type: Number,
      required: true,
      min: 1,
    },
    distanceKm: {
      type: Number,
      min: 0,
    },
    caloriesBurned: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Activity = mongoose.models.Activity || mongoose.model<IActivity>('Activity', activitySchema);

export default Activity;
