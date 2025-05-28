const sessionService = require("@/services/session.service");
const { randomUUID } = require("node:crypto");

async function handleSession(req, res, next) {
  let _sid = req.cookies.sid;
  let session = _sid && (await sessionService.getBySid(_sid));
  if (!session) {
    _sid = randomUUID();
    const date = new Date();
    session = await sessionService.create({ sid: _sid, data: null });
    res.set("Set-Cookie", `sid=${_sid}; path=/; httpOnly; expires=${date}`);
  }

  const sessionData = JSON.parse(session.data) ?? {};
  req.session = {
    get(key) {
      return sessionData[key] ?? null;
    },
    set(key, value) {
      sessionData[key] = value;
      sessionService.update(_sid, {
        data: JSON.stringify(sessionData),
      });
    },
  };
  next();
}

module.exports = handleSession;
