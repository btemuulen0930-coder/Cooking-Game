import { Router } from 'express';
import { protect } from '../middleware/auth';
import {
  getIngredients,
  getChallenges,
  getProgress,
  finishRun,
  unlockIngredient,
} from '../controllers/game.controller';

const router = Router();

router.get('/ingredients', getIngredients);
router.get('/challenges', getChallenges);
router.get('/progress', protect, getProgress);
router.post('/runs', protect, finishRun);
router.post('/unlock', protect, unlockIngredient);

export default router;
