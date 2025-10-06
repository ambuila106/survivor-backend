import Match from '../models/Match';
import PredictionSurvivor from '../models/PredictionSurvivor';
import GambleSurvivor from '../models/GambleSurvivor';
import Gameweek from '../models/GameWeek';
import Survivor from '../models/Survivor';

export default class MatchRepository {
  async findMatchById(id: string) {
    return Match.findById(id);
  }

  async saveMatch(match: any) {
    return match.save();
  }

  async findPendingPredictions(matchId: string) {
    return PredictionSurvivor.find({ matchId, result: 'pending' });
  }

  async savePrediction(prediction: any) {
    return prediction.save();
  }

  async findGambleById(id: string) {
    return GambleSurvivor.findById(id);
  }

  async saveGamble(gamble: any) {
    return gamble.save();
  }

  async findGameweekByMatch(matchId: string) {
    return Gameweek.findOne({ matches: matchId }).populate('matches');
  }

  async saveGameweek(gameweek: any) {
    return gameweek.save();
  }

  async findSurvivorByGameweek(gameweekId: string) {
    return Survivor.findOne({ gameweeks: gameweekId });
  }

  async findPlayersBySurvivor(survivorId: string) {
    return GambleSurvivor.find({ survivorId });
  }

  async savePlayer(player: any) {
    return player.save();
  }
}
