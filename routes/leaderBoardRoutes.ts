import express from 'express';
import {
  getLeaderboard,
} from '../controllers/leaderboardController';

const router = express.Router();

router.get('/:survivorId', getLeaderboard);

export default router;
