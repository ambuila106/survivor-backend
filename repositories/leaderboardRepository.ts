import GambleSurvivor from '../models/GambleSurvivor';

export default class LeaderboardRepository {
  async findPlayersBySurvivor(survivorId: string) {
    return GambleSurvivor.find({ survivorId })
      .populate('playerId', 'name')
      .sort({ isEliminated: 1, lives: -1 });
  }
}