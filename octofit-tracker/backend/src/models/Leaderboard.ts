import mongoose, { Schema, type Document, type Types } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  score: number;
  rank: number;
  period: string;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      default: null,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    rank: {
      type: Number,
      required: true,
      min: 1,
    },
    period: {
      type: String,
      required: true,
      default: 'week',
    },
  },
  {
    timestamps: true,
  },
);

const Leaderboard = mongoose.models.Leaderboard || mongoose.model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);

export default Leaderboard;
