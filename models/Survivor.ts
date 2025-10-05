import mongoose, { Document, Schema } from 'mongoose';
import { IGameweek } from './Gameweek';

export interface ISurvivor extends Document {
  name: string;
  gameweeks: IGameweek[];
  startDate: Date;
  lives: number;
}

const SurvivorSchema = new Schema<ISurvivor>({
  name: { type: String, required: true },
  gameweeks: { type: [Object], default: [] },
  startDate: { type: Date, required: true },
  lives: { type: Number, default: 3 },
});

export default mongoose.model<ISurvivor>('Survivor', SurvivorSchema);
