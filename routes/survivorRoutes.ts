import express, { Request, Response } from 'express';
import Survivor from '../models/Survivor';

const router = express.Router();

// Get all survivors
router.get('/', async (req: Request, res: Response) => {
  try {
    const survivors = await Survivor.find()
      .populate({
        path: 'gameweeks',
        populate: {
          path: 'matches',
          populate: [
            { path: 'home', model: 'Team' },
            { path: 'visitor', model: 'Team' },
          ],
        },
      });

    res.json(survivors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching survivors' });
  }
});

// Join survivor
router.post('/join/:id', async (req: Request, res: Response) => {
  res.json({ message: 'Join survivor endpoint - YOUR CODE HERE' });
});

// Choose team
router.post('/pick', async (req: Request, res: Response) => {
//  YOUR CODE HERE
});

export default router;