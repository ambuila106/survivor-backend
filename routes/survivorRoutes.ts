import express from 'express';
import { getAllSurvivors, getSurvivorById, joinSurvivor, pickTeam } from '../controllers/survivorController';

const router = express.Router();

router.get('/', getAllSurvivors);
router.get('/:id', getSurvivorById);
router.post('/join', joinSurvivor);
router.post('/pick', pickTeam);

export default router;
