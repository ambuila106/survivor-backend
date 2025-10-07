import express, { Request, Response } from 'express';
import Player, { IPlayer } from '../models/Player';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newPlayer: IPlayer = new Player({ name });
    const savedPlayer = await newPlayer.save();

    res.status(201).json(savedPlayer);
  } catch (err) {
    const error = err as Error;
    console.error('Error creating player:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    res.status(500).json({ error: 'Error fetching players' });
  }
});

export default router;
