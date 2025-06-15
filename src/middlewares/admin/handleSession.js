const sessionService = require("@/services/session.service");
const { randomUUID } = require("node:crypto");

async function handleSession(req, res, next) {
  let _id = req.cookies.id;
  let session = _id && (await sessionService.getById(_id));
  if (!session) {
    _id = randomUUID();
    const days_7 = 7 * 24 * 60 * 60 * 1000;
    const expires = new Date(Date.now() + days_7);
    session = await sessionService.create({
      id: _id,
      data: null,
      expires_at: expires,
    });
    // res.set("Set-Cookie", `id=${_id}; path=/; httpOnly; expires=${date}`);
    res.cookie("id", _id, {
      path: "/",
      maxAge: days_7,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  }

  req.session = JSON.parse(session?.data ?? null) ?? {};
  // req.setFlash = (data) => {
  //   req.session.flash = data;
  // };
  // req.session = {
  //   ...sessionData,
  //   get(key) {
  //     return sessionData[key] ?? null;
  //   },
  //   set(key, value) {
  //     sessionData[key] = value;
  //     sessionService.update(_id, {
  //       data: JSON.stringify(sessionData),
  //     });
  //   },
  // };
  res.on("finish", () => {
    sessionService.update(_id, {
      data: JSON.stringify(req.session),
    });
  });

  next();
}

module.exports = handleSession;
