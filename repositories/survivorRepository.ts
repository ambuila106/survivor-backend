import Survivor from '../models/Survivor';
import Player from '../models/Player';
import GambleSurvivor from '../models/GambleSurvivor';
import PredictionSurvivor from '../models/PredictionSurvivor';
import Gameweek from '../models/GameWeek';
import Match from '../models/Match';

export default class SurvivorRepository {
  async findAll() {
    return Survivor.find();
  }

  async findById(id: string) {
    return Survivor.findById(id).populate({
      path: 'gameweeks',
      populate: {
        path: 'matches',
        populate: [{ path: 'home' }, { path: 'visitor' }],
      },
    });
  }

  async findPlayer(playerId: string) {
    return Player.findById(playerId);
  }

  async findGamble(survivorId: string, playerId: string) {
    return GambleSurvivor.findOne({ survivorId, playerId });
  }

  async createGamble(data: any) {
    return GambleSurvivor.create(data);
  }

  async findGameweek(id: string) {
    return Gameweek.findById(id);
  }

  async findMatch(id: string) {
    return Match.findById(id);
  }

  async findOrCreatePrediction(query: any, data: any) {
    let prediction = await PredictionSurvivor.findOne(query);
    if (!prediction) prediction = await PredictionSurvivor.create(data);
    return prediction;
  }

  async updatePrediction(prediction: any, teamId: string) {
    prediction.teamId = teamId;
    return prediction.save();
  }
}
