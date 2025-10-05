import express, { Request, Response } from 'express';
import Survivor from '../models/Survivor';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const survivors = await Survivor.find(); // sin populate
    res.json(survivors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching survivors' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const survivor = await Survivor.findById(req.params.id)
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

    if (!survivor) {
      return res.status(404).json({ error: 'Survivor not found' });
    }

    res.json(survivor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching survivor details' });
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