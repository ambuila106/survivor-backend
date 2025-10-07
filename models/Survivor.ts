import mongoose, { Document, Schema } from 'mongoose';

export interface ISurvivor extends Document {
  name: string;
  startDate: Date;
  lives: number;
  gameweeks: mongoose.Types.ObjectId[];
  pot?: number;
}

const SurvivorSchema = new Schema<ISurvivor>({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  lives: { type: Number, default: 3 },
  gameweeks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gameweek' }],
});

export default mongoose.model<ISurvivor>('Survivor', SurvivorSchema);
