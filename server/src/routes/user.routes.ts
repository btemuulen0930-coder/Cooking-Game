import { Router } from 'express';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/me', protect, (req, res) => {
  const { id, name, email, role } = req.user!;
  res.json({ id, name, email, role });
});

export default router;
