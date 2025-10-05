import mongoose, { Document, Schema } from 'mongoose';
import { ISurvivor } from './Survivor';
import { IPlayer } from './Player';

export interface IGambleSurvivor extends Document {
  survivorId: ISurvivor['_id'];
  playerId: IPlayer['_id'];
  lives: number;
  position?: number;
  joinedAt?: Date;
  isEliminated: boolean;
}

const GambleSurvivorSchema = new Schema<IGambleSurvivor>({
  survivorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Survivor', required: true },
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  lives: { type: Number, default: 3 },
  position: { type: Number, default: null },
  joinedAt: { type: Date, default: Date.now },
  isEliminated: { type: Boolean, default: false },
});

export default mongoose.model<IGambleSurvivor>('GambleSurvivor', GambleSurvivorSchema);
