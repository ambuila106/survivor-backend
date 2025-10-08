import express, { Request, Response } from 'express';
import GambleSurvivor from '../models/GambleSurvivor';
import Player from '../models/Player';
import Survivor from '../models/Survivor';

const router = express.Router();

/**
 * 📊 Obtener tabla de jugadores (vidas y estado) de un Survivor
 * GET /api/leaderboard/:survivorId
 */
router.get('/:survivorId', async (req: Request, res: Response) => {
  try {
    const { survivorId } = req.params;

    const survivor = await Survivor.findById(survivorId);
    if (!survivor) {
      return res.status(404).json({ error: 'Survivor not found' });
    }

    const players = await GambleSurvivor.find({ survivorId })
      .populate('playerId', 'name')
      .sort({ isEliminated: 1, lives: -1 });

    const formatted = players.map((g, index) => ({
      rank: index + 1,
      playerName: (g.playerId as any)?.name,
      lives: g.lives,
      isEliminated: g.isEliminated,
      joinedAt: g.joinedAt,
    }));

    res.status(200).json({
      survivor: survivor.name,
      leaderboard: formatted,
    });
  } catch (error: any) {
    console.error('❌ Error fetching leaderboard:', error);
    res.status(500).json({ error: error.message || 'Error fetching leaderboard' });
  }
});

export default router;
