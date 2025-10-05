import SurvivorRepository from '../repositories/survivorRepository';

export default class SurvivorService {
  private repo = new SurvivorRepository();

  async getAllSurvivors() {
    return this.repo.findAll();
  }

  async getSurvivorById(id: string) {
    const survivor = await this.repo.findById(id);
    if (!survivor) throw new Error('Survivor not found');
    return survivor;
  }

  async joinSurvivor(playerId: string, survivorId: string) {
    const survivor = await this.repo.findById(survivorId);
    if (!survivor) throw new Error('Survivor not found');

    const player = await this.repo.findPlayer(playerId);
    if (!player) throw new Error('Player not found');

    const existingGamble = await this.repo.findGamble(survivorId, playerId);
    if (existingGamble) throw new Error('Player already joined');

    return this.repo.createGamble({
      survivorId,
      playerId,
      lives: 3,
      joinedAt: new Date(),
      isEliminated: false,
    });
  }

  async pickTeam(playerId: string, survivorId: string, gameweekId: string, matchId: string, teamId: string) {
    const gamble = await this.repo.findGamble(survivorId, playerId);
    if (!gamble) throw new Error('Player not part of survivor');

    const gameweek = await this.repo.findGameweek(gameweekId);
    if (!gameweek) throw new Error('Gameweek not found');

    if (new Date() >= gameweek.startDate) {
      throw new Error('Cannot pick after gameweek started');
    }

    const match = await this.repo.findMatch(matchId);
    if (!match) throw new Error('Match not found');

    let prediction = await this.repo.findOrCreatePrediction(
      { gambleId: gamble._id, matchId, gameweekId },
      { gambleId: gamble._id, survivorId, playerId, gameweekId, matchId, teamId, result: 'pending' }
    );

    prediction.teamId = teamId;
    await this.repo.updatePrediction(prediction, teamId);
    return prediction;
  }
}
