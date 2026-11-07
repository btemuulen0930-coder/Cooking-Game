import { Schema, model, Types } from 'mongoose';

// One small document per player. Ingredient definitions live in code
// (src/game/ingredients.ts), the database only stores ids and numbers.
export interface IProgress {
  user: Types.ObjectId;
  coins: number;
  unlocked: string[];
  bestScore: number;
  runsPlayed: number;
}

const progressSchema = new Schema<IProgress>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    coins: { type: Number, default: 0, min: 0 },
    unlocked: { type: [String], default: [] },
    bestScore: { type: Number, default: 0 },
    runsPlayed: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model<IProgress>('Progress', progressSchema);
