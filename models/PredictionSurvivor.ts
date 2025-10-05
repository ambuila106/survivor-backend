import mongoose, { Document, Schema } from 'mongoose';
import { IGambleSurvivor } from '../models/GambleSurvivor';

export interface IPredictionSurvivor extends Document {
  gambleId: IGambleSurvivor['_id'];
  matchId: mongoose.Types.ObjectId;
  teamId: mongoose.Types.ObjectId;
  gameweekId: mongoose.Types.ObjectId;
  result: 'pending' | 'success' | 'fail';
}

const PredictionSurvivorSchema = new Schema<IPredictionSurvivor>({
  gambleId: { type: mongoose.Schema.Types.ObjectId, ref: 'GambleSurvivor', required: true },
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  gameweekId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gameweek', required: true },
  result: { type: String, enum: ['pending', 'success', 'fail'], default: 'pending' },
});

export default mongoose.model<IPredictionSurvivor>('PredictionSurvivor', PredictionSurvivorSchema);
