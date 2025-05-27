const sessionModel = require("@/models/session.model");

class SessionService {
  async getBySid(sid) {
    const session = await sessionModel.findBySid(sid);
    return session;
  }
}

module.exports = new SessionService();
