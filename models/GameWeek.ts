import mongoose, { Document, Schema } from 'mongoose';

export interface IGameweek extends Document {
  number: number;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'active' | 'finished';
  isActive: boolean;
  matches: mongoose.Types.ObjectId[];
}

const GameweekSchema = new Schema<IGameweek>({
  number: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['pending', 'active', 'finished'],
    default: 'pending',
  },
  isActive: { type: Boolean, default: false },
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
});

export default mongoose.model<IGameweek>('Gameweek', GameweekSchema);
