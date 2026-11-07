import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import Progress from '../models/Progress';
import { INGREDIENTS } from '../game/ingredients';
import { CHALLENGES } from '../game/challenges';

const MAX_SCORE = 100000; // sanity limit so nobody sends a silly score
const SCORE_PER_COIN = 10;

async function getOrCreateProgress(userId: Types.ObjectId) {
  const existing = await Progress.findOne({ user: userId });
  return existing ?? Progress.create({ user: userId });
}

export const getIngredients = (_req: Request, res: Response) => {
  res.json(INGREDIENTS);
};

export const getChallenges = (_req: Request, res: Response) => {
  res.json(CHALLENGES);
};

export const getProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const progress = await getOrCreateProgress(req.user!._id);
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

// Called when a run ends. The server decides how many coins the score is worth.
export const finishRun = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const score = Number(req.body.score);
    if (!Number.isFinite(score) || score < 0 || score > MAX_SCORE) {
      return res.status(400).json({ message: 'Invalid score' });
    }

    const userId = req.user!._id;
    await getOrCreateProgress(userId);
    const coinsEarned = Math.floor(score / SCORE_PER_COIN);

    const progress = await Progress.findOneAndUpdate(
      { user: userId },
      { $inc: { coins: coinsEarned, runsPlayed: 1 }, $max: { bestScore: score } },
      { new: true }
    );
    res.json({ coinsEarned, progress });
  } catch (err) {
    next(err);
  }
};

export const unlockIngredient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredient = INGREDIENTS.find((i) => i.id === req.body.ingredientId);
    if (!ingredient) return res.status(404).json({ message: 'Unknown ingredient' });

    const userId = req.user!._id;
    await getOrCreateProgress(userId);

    // One atomic update: only succeeds if the player can afford it and doesn't own it yet
    const progress = await Progress.findOneAndUpdate(
      { user: userId, coins: { $gte: ingredient.cost }, unlocked: { $ne: ingredient.id } },
      { $inc: { coins: -ingredient.cost }, $push: { unlocked: ingredient.id } },
      { new: true }
    );
    if (!progress) {
      return res.status(400).json({ message: 'Not enough coins, or already unlocked' });
    }
    res.json(progress);
  } catch (err) {
    next(err);
  }
};
