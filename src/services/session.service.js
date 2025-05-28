const sessionModel = require("@/models/session.model");

class SessionService {
  async getBySid(sid) {
    const session = await sessionModel.findBySid(sid);
    return session;
  }
  async create(data) {
    const session = await sessionModel.create(data);
    return session;
  }

  async update(sid, data) {
    const session = await sessionModel.update(sid, data);
    return session;
  }

  async remove(sid) {
    const result = await sessionModel.remove(sid);
    return result;
  }
}

module.exports = new SessionService();
