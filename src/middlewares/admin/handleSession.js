const sessionModel = require("@/models/session.model");
const { randomUUID } = require("node:crypto");

async function handleSession(req, res, next) {
  let _sid = req.cookies.sid;
  let session = _sid && (await sessionModel.findBySid(_sid));
  if (!session) {
    _sid = randomUUID();
    const date = new Date();
    session = await sessionModel.create({ sid: _sid });
    res.set("Set-Cookie", `sid=${_sid}; path=/; httpOnly; expires=${date}`);
  }
  const sessionData = JSON.parse(session.data ?? null) ?? {};
  req.session = {
    get(key) {
      return sessionData[key] ?? null;
    },
    set(key, value) {
      sessionData[key] = value;
      sessionModel.update(_sid, {
        data: JSON.stringify(sessionData),
      });
    },
  };
  next();
}

module.exports = handleSession;
