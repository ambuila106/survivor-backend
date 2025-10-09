import { Request, Response } from 'express';
import PlayerService from '../services/playerService';

const service = new PlayerService();

export const getAllPlayers = async (req: Request, res: Response) => {
  try {
    const players = await service.getAllPlayers();
    res.status(200).json(players);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const getPlayerById = async (req: Request, res: Response) => {
  try {
    const player = await service.getPlayerById(req.params.id);
    res.status(200).json(player);
  } catch (err) {
    const error = err as Error;
    if (error.message === 'Player not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const createPlayer = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const player = await service.createPlayer(name);
    res.status(201).json(player);
  } catch (err) {
    const error = err as Error;
    if (error.message === 'Name is required' || error.message === 'Player with this name already exists') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const updatePlayer = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const player = await service.updatePlayer(req.params.id, name);
    res.status(200).json(player);
  } catch (err) {
    const error = err as Error;
    if (error.message === 'Player not found') {
      res.status(404).json({ error: error.message });
    } else if (error.message === 'Name is required' || error.message === 'Player with this name already exists') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const deletePlayer = async (req: Request, res: Response) => {
  try {
    await service.deletePlayer(req.params.id);
    res.status(200).json({ message: 'Player deleted successfully' });
  } catch (err) {
    const error = err as Error;
    if (error.message === 'Player not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};