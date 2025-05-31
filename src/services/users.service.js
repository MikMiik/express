const usersModel = require("@/models/users.model");

class UsersService {
  async getAll(page = 1, limit = 10) {
    const items = await usersModel.findAll(page, limit);
    const total = await usersModel.count();
    return { items, total };
  }

  async getById(id) {
    const user = await usersModel.findById(id);
    return user;
  }

  async getByEmail(email) {
    const user = await usersModel.findByEmail(email);
    return user;
  }

  async getByEmailAndPassword(email, password) {
    const user = await usersModel.findByEmailAndPassword(email, password);
    return user;
  }

  async create(data) {
    const user = await usersModel.create(data);
    return user;
  }

  async update(id, data) {
    const user = await usersModel.update(id, data);
    return user;
  }

  async remove(id) {
    const result = await usersModel.remove(id);
    return result;
  }
}

module.exports = new UsersService();
