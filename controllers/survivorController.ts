import { Request, Response } from 'express';
import SurvivorService from '../services/survivorService';

const service = new SurvivorService();

export const getAllSurvivors = async (req: Request, res: Response) => {
  try {
    const data = await service.getAllSurvivors();
    res.json(data);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const getSurvivorById = async (req: Request, res: Response) => {
  try {
    const survivor = await service.getSurvivorById(req.params.id);
    res.json(survivor);
  } catch (err) {
    const error = err as Error;
    res.status(404).json({ error: error.message });
  }
};

export const joinSurvivor = async (req: Request, res: Response) => {
  try {
    const { playerId, survivorId } = req.body;
    const gamble = await service.joinSurvivor(playerId, survivorId);
    res.status(201).json(gamble);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

export const pickTeam = async (req: Request, res: Response) => {
  try {
    const { playerId, survivorId, gameweekId, matchId, teamId } = req.body;
    const prediction = await service.pickTeam(playerId, survivorId, gameweekId, matchId, teamId);
    res.status(201).json(prediction);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};
