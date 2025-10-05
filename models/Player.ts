import mongoose, { Document, Schema } from 'mongoose';

export interface IPlayer extends Document {
  name: string;
}

const PlayerSchema = new Schema<IPlayer>({
  name: { type: String, required: true },
});

export default mongoose.model<IPlayer>('Player', PlayerSchema);
