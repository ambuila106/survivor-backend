import PlayerRepository from '../repositories/playerRepository';

export default class PlayerService {
  private repo = new PlayerRepository();

  async getAllPlayers() {
    return this.repo.findAll();
  }

  async getPlayerById(id: string) {
    const player = await this.repo.findById(id);
    if (!player) throw new Error('Player not found');
    return player;
  }

  async createPlayer(name: string) {
    if (!name) throw new Error('Name is required');
    
    const existingPlayer = await this.repo.findByName(name);
    if (existingPlayer) throw new Error('Player with this name already exists');
    
    return this.repo.create({ name });
  }

  async updatePlayer(id: string, name: string) {
    if (!name) throw new Error('Name is required');
    
    const player = await this.repo.findById(id);
    if (!player) throw new Error('Player not found');
    
    const existingPlayer = await this.repo.findByName(name);
    if (existingPlayer && existingPlayer._id.toString() !== id) {
      throw new Error('Player with this name already exists');
    }
    
    return this.repo.update(id, { name });
  }

  async deletePlayer(id: string) {
    const player = await this.repo.findById(id);
    if (!player) throw new Error('Player not found');
    
    return this.repo.delete(id);
  }
}