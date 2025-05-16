const usersModel = require("@/models/users.model");

class UsersService {
  async getAll({ page = 1, limit = 10 } = {}) {
    page = page <= 0 ? 1 : page;
    limit = limit <= 0 ? 10 : limit;
    const offset = (page - 1) * 10;
    const { users, users_count } = await usersModel.findAll(+limit, offset);
    return {
      data: users,
      pagination: {
        current_page: +page,
        per_page: +limit,
        total_users: users_count,
        total_page: Math.ceil(users_count / limit),
      },
    };
    // return users;
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
