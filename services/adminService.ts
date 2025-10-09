import { MatchService } from './matchService';
import MatchRepository from '../repositories/matchRepository';

export default class AdminService {
  private matchService: MatchService;

  constructor() {
    const matchRepository = new MatchRepository();
    this.matchService = new MatchService(matchRepository);
  }

  async updateMatchResult(matchId: string, scoreHome: number, scoreVisitor: number) {
    if (scoreHome == null || scoreVisitor == null) {
      throw new Error('Both scores are required');
    }

    const result = await this.matchService.updateMatchResult(matchId, scoreHome, scoreVisitor);
    
    return {
      message: '✅ Match result updated and predictions recalculated',
      ...result,
    };
  }
}