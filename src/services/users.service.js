const usersModel = require("@/models/users.model");
const { paginate } = require("@/utils/paginate");

class UsersService {
  async getAll({ page = 1, limit = 10 } = {}) {
    const users = await paginate(usersModel.findAll, page, limit, "users");
    return users;
  }

  async getById(id) {
    const user = await usersModel.findById(id);
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
