import mongoose, { Document, Schema } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  flag: string;
}

const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  flag: { type: String, required: true },
});

export default mongoose.model<ITeam>('Team', TeamSchema);
