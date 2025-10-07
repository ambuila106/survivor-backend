import express from 'express';
import {
  getAllSurvivors,
  getSurvivorById,
  joinSurvivor,
  pickTeam,
  getPlayerSurvivorData,
} from '../controllers/survivorController';

const router = express.Router();

router.get('/', getAllSurvivors);
router.get('/:id', getSurvivorById);
router.post('/join', joinSurvivor);
router.post('/pick', pickTeam);
router.get('/:id/player/:playerId', getPlayerSurvivorData);

export default router;
