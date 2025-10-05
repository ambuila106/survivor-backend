import mongoose, { Document, Schema } from 'mongoose';

export interface IMatch extends Document {
  matchId: string;
  home: mongoose.Types.ObjectId;
  visitor: mongoose.Types.ObjectId;
  scoreHome?: number;
  scoreVisitor?: number;
  winner?: mongoose.Types.ObjectId;
}

const MatchSchema = new Schema<IMatch>({
  matchId: { type: String, required: true },
  home: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  visitor: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  scoreHome: { type: Number, default: null },
  scoreVisitor: { type: Number, default: null },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null },
});

export default mongoose.model<IMatch>('Match', MatchSchema);
