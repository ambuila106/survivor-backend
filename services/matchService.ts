import MatchRepository from '../repositories/matchRepository';

export class MatchService {
  private repository: MatchRepository;

  constructor(repository?: MatchRepository) {
    this.repository = repository || new MatchRepository();
  }

  async updateMatchResult(matchId: string, scoreHome: number, scoreVisitor: number) {
    const match = await this.repository.findMatchById(matchId);
    if (!match) throw new Error('Match not found');

    let winner: any = null;
    if (scoreHome > scoreVisitor) winner = match.home;
    else if (scoreVisitor > scoreHome) winner = match.visitor;

    match.scoreHome = scoreHome;
    match.scoreVisitor = scoreVisitor;
    match.winner = winner;
    await this.repository.saveMatch(match);

    await this.recalculatePredictions(matchId, winner);
    await this.checkGameweekStatus(match._id);

    return { match, winner };
  }

  private async recalculatePredictions(matchId: string, winner: any) {
    const predictions = await this.repository.findPendingPredictions(matchId);

    for (const pred of predictions) {
      pred.result = winner && String(pred.teamId) === String(winner) ? 'success' : 'fail';

      if (pred.result === 'fail') {
        const gamble = await this.repository.findGambleById(pred.gambleId);
        if (gamble && !gamble.isEliminated) {
          gamble.lives = Math.max(0, gamble.lives - 1);
          if (gamble.lives === 0) gamble.isEliminated = true;
          await this.repository.saveGamble(gamble);
        }
      }

      await this.repository.savePrediction(pred);
    }
  }

  private async checkGameweekStatus(matchId: string) {
    const gameweek = await this.repository.findGameweekByMatch(matchId);
    if (!gameweek) return;

    const allFinished = gameweek.matches.every(
      (m: any) => m.scoreHome != null && m.scoreVisitor != null
    );

    if (allFinished) {
      gameweek.status = 'finished';
      gameweek.isActive = false;
      await this.repository.saveGameweek(gameweek);

      await this.updateSurvivorStatus(gameweek._id);
    }
  }

  private async updateSurvivorStatus(gameweekId: string) {
    const survivor = await this.repository.findSurvivorByGameweek(gameweekId);
    if (!survivor) return;

    const players = await this.repository.findPlayersBySurvivor(survivor._id);
    const alivePlayers = players.filter((p) => !p.isEliminated);

    if (alivePlayers.length === 1) {
      const winnerPlayer = alivePlayers[0];
      winnerPlayer.position = 1;
      await this.repository.savePlayer(winnerPlayer);
      console.log(`🏆 Survivor ${survivor.name} won by player ${winnerPlayer.playerId}`);
    } else if (alivePlayers.length === 0) {
      console.log(`⚠️ All players eliminated in ${survivor.name}`);
    }
  }
}
