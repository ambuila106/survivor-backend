import { Request, Response } from 'express';
import AdminService from '../services/adminService';

const service = new AdminService();

export const updateMatchResult = async (req: Request, res: Response) => {
  try {
    const { scoreHome, scoreVisitor } = req.body;
    const { id: matchId } = req.params;

    const result = await service.updateMatchResult(matchId, scoreHome, scoreVisitor);
    res.status(200).json(result);
  } catch (err) {
    const error = err as Error;
    if (error.message === 'Both scores are required') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message || 'Error updating match' });
    }
  }
};