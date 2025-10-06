import express, { Request, Response } from 'express';
import Match from '../models/Match';
import PredictionSurvivor from '../models/PredictionSurvivor';
import GambleSurvivor from '../models/GambleSurvivor';
import Gameweek from '../models/GameWeek';
import Survivor from '../models/Survivor';

const router = express.Router();

/**
 * 🧮 Actualiza el resultado de un partido y recalcula el estado del survivor
 */
router.post('/update-match/:id', async (req: Request, res: Response) => {
  try {
    const { scoreHome, scoreVisitor } = req.body;
    const { id: matchId } = req.params;

    if (scoreHome == null || scoreVisitor == null) {
      return res.status(400).json({ error: 'Both scores are required' });
    }

    // 1️⃣ Buscar partido
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    // 2️⃣ Determinar ganador
    let winner: any = null;
    if (scoreHome > scoreVisitor) winner = match.home;
    else if (scoreVisitor > scoreHome) winner = match.visitor;
    else winner = null; // empate

    // 3️⃣ Guardar resultado
    match.scoreHome = scoreHome;
    match.scoreVisitor = scoreVisitor;
    match.winner = winner;
    await match.save();

    // 4️⃣ Buscar predicciones pendientes
    const predictions = await PredictionSurvivor.find({ matchId, result: 'pending' });

    for (const pred of predictions) {
      // Evaluar resultado
      if (winner && String(pred.teamId) === String(winner)) {
        pred.result = 'success';
      } else {
        pred.result = 'fail';

        // 5️⃣ Restar vida al jugador si falló o empató
        const gamble = await GambleSurvivor.findById(pred.gambleId);
        if (gamble && !gamble.isEliminated) {
          gamble.lives = Math.max(0, gamble.lives - 1);
          if (gamble.lives === 0) {
            gamble.isEliminated = true;
          }
          await gamble.save();
        }
      }

      await pred.save();
    }

    // 6️⃣ Revisar si todos los partidos del gameweek terminaron
    const gameweek = await Gameweek.findOne({ matches: match._id }).populate('matches');
    if (gameweek) {
      const allFinished = gameweek.matches.every(
        (m: any) => m.scoreHome != null && m.scoreVisitor != null
      );

      if (allFinished) {
        gameweek.status = 'finished';
        gameweek.isActive = false;
        await gameweek.save();

        // 7️⃣ Revisar estado del survivor
        const survivor = await Survivor.findOne({ gameweeks: gameweek._id });
        if (survivor) {
          const players = await GambleSurvivor.find({ survivorId: survivor._id });
          const alivePlayers = players.filter((p) => !p.isEliminated);

          if (alivePlayers.length === 1) {
            const winnerPlayer = alivePlayers[0];
            winnerPlayer.position = 1;
            await winnerPlayer.save();
            console.log(`🏆 Survivor ${survivor.name} won by player ${winnerPlayer.playerId}`);
          } else if (alivePlayers.length === 0) {
            console.log(`⚠️ All players eliminated in ${survivor.name}`);
          }
        }
      }
    }

    res.status(200).json({
      message: '✅ Match result updated and predictions recalculated',
      match,
      winner,
    });
  } catch (error: any) {
    console.error('❌ Error updating match:', error);
    res.status(500).json({ error: error.message || 'Error updating match' });
  }
});

export default router;
