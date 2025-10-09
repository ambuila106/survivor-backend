import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

const service = new LeaderboardService();

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const { survivorId } = req.params;
    const leaderboard = await service.getLeaderboard(survivorId);
    res.status(200).json(leaderboard);
  } catch (err) {
    const error = err as Error;
    if (error.message === 'Survivor not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};