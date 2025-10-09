import Player from '../models/Player';

export default class PlayerRepository {
  async findAll() {
    return Player.find();
  }

  async findById(id: string) {
    return Player.findById(id);
  }

  async create(data: any) {
    return Player.create(data);
  }

  async update(id: string, data: any) {
    return Player.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return Player.findByIdAndDelete(id);
  }

  async findByName(name: string) {
    return Player.findOne({ name });
  }
}