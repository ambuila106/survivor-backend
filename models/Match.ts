import mongoose, { Document, Schema } from 'mongoose';
import { ITeam } from '../models/Team';

export interface IMatch extends Document {
  matchId: string;
  home: ITeam;
  visitor: ITeam;
  scoreHome?: number;
  scoreVisitor?: number;
  winner?: mongoose.Types.ObjectId;
}

const MatchSchema = new Schema<IMatch>({
  matchId: { type: String, required: true },
  home: { type: Object, required: true },
  visitor: { type: Object, required: true },
  scoreHome: { type: Number, default: null },
  scoreVisitor: { type: Number, default: null },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null },
});

export default mongoose.model<IMatch>('Match', MatchSchema);
