const sessionModel = require("@/models/session.model");

class SessionService {
  async getById(id) {
    const session = await sessionModel.findById(id);
    return session;
  }
  async create(data) {
    const session = await sessionModel.create(data);
    return session;
  }

  async update(id, data) {
    const session = await sessionModel.update(id, data);
    return session;
  }

  async remove(id) {
    const result = await sessionModel.remove(id);
    return result;
  }
}

module.exports = new SessionService();
