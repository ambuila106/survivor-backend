import express, { Request, Response } from 'express';
import { MatchService } from '../services/matchService';
import MatchRepository from '../repositories/matchRepository';

const router = express.Router();

const matchRepository = new MatchRepository();
const matchService = new MatchService(matchRepository);


router.post('/update-match/:id', async (req: Request, res: Response) => {
  try {
    const { scoreHome, scoreVisitor } = req.body;
    const { id: matchId } = req.params;

    if (scoreHome == null || scoreVisitor == null) {
      return res.status(400).json({ error: 'Both scores are required' });
    }

    const result = await matchService.updateMatchResult(matchId, scoreHome, scoreVisitor);

    res.status(200).json({
      message: '✅ Match result updated and predictions recalculated',
      ...result,
    });
  } catch (error: any) {
    console.error('❌ Error updating match:', error);
    res.status(500).json({ error: error.message || 'Error updating match' });
  }
});

export default router;
