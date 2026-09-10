import mongoose, { Schema, type Document, type Types } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  motto?: string;
  members: Types.ObjectId[];
  points: number;
}

const teamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    motto: {
      type: String,
      trim: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    points: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Team = mongoose.models.Team || mongoose.model<ITeam>('Team', teamSchema);

export default Team;
