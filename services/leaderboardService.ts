import LeaderboardRepository from '../repositories/leaderboardRepository';
import SurvivorRepository from '../repositories/survivorRepository';

export default class LeaderboardService {
  private leaderboardRepo = new LeaderboardRepository();
  private survivorRepo = new SurvivorRepository();

  async getLeaderboard(survivorId: string) {
    const survivor = await this.survivorRepo.findById(survivorId);
    if (!survivor) throw new Error('Survivor not found');

    const players = await this.leaderboardRepo.findPlayersBySurvivor(survivorId);

    const formatted = players.map((g, index) => ({
      rank: index + 1,
      playerName: (g.playerId as any)?.name,
      lives: g.lives,
      isEliminated: g.isEliminated,
      joinedAt: g.joinedAt,
    }));

    return {
      survivor: survivor.name,
      leaderboard: formatted,
    };
  }
}