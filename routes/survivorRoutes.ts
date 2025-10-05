import express, { Request, Response } from 'express';
import Survivor from '../models/Survivor';
import Player from '../models/Player';
import GambleSurvivor from '../models/GambleSurvivor';
import PredictionSurvivor from '../models/PredictionSurvivor';
import Match from '../models/Match';
import Gameweek from '../models/GameWeek';


const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const survivors = await Survivor.find();
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


router.post('/join', async (req: Request, res: Response) => {
  try {
    const { playerId, survivorId } = req.body;

    if (!playerId || !survivorId) {
      return res.status(400).json({ error: 'playerId and survivorId are required' });
    }

    const survivor = await Survivor.findById(survivorId);
    if (!survivor) {
      return res.status(404).json({ error: 'Survivor not found' });
    }

    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    const existingGamble = await GambleSurvivor.findOne({ survivorId, playerId });
    if (existingGamble) {
      return res.status(400).json({ error: 'Player already joined this survivor' });
    }

    const gamble = await GambleSurvivor.create({
      survivorId,
      playerId,
      lives: 3,
      isEliminated: false,
      joinedAt: new Date(),
    });

    res.status(201).json({
      message: `Player ${player.name} successfully joined survivor ${survivor.name}.`,
      gamble,
    });
  } catch (error) {
    console.error('❌ Error joining survivor:', error);
    res.status(500).json({ error: 'Error joining survivor' });
  }
});

router.post('/pick', async (req: Request, res: Response) => {
  try {
    const { playerId, survivorId, gameweekId, matchId, teamId } = req.body;

    if (!playerId || !survivorId || !gameweekId || !matchId || !teamId) {
      return res.status(400).json({
        error: 'playerId, survivorId, gameweekId, matchId, and teamId are required',
      });
    }

    // 1️⃣ Validar jugador inscrito en el survivor
    const gamble = await GambleSurvivor.findOne({ playerId, survivorId });
    if (!gamble) {
      return res.status(404).json({ error: 'Player is not part of this survivor' });
    }

    // 2️⃣ Validar existencia del gameweek
    const gameweek = await Gameweek.findById(gameweekId);
    if (!gameweek) {
      return res.status(404).json({ error: 'Gameweek not found' });
    }

    // 🚫 3️⃣ Verificar si ya comenzó el gameweek
    const now = new Date();
    if (now >= gameweek.startDate) {
      return res.status(403).json({
        error: 'Cannot change or create a pick after the gameweek has started',
      });
    }

    // 4️⃣ Validar existencia del partido
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    // 5️⃣ Buscar o crear la predicción
    let prediction = await PredictionSurvivor.findOne({
      gambleId: gamble._id,
      matchId,
      gameweekId,
    });

    if (!prediction) {
      prediction = await PredictionSurvivor.create({
        gambleId: gamble._id,
        survivorId,
        playerId,
        gameweekId,
        matchId,
        teamId,
        result: 'pending',
      });

      return res.status(201).json({
        message: 'Prediction created successfully',
        prediction,
      });
    }

    // 6️⃣ Si ya existía, actualizarla
    prediction.teamId = teamId;
    await prediction.save();

    res.status(200).json({
      message: 'Prediction updated successfully',
      prediction,
    });
  } catch (error) {
    console.error('❌ Error saving prediction:', error);
    res.status(500).json({ error: 'Error saving prediction' });
  }
});

export default router;