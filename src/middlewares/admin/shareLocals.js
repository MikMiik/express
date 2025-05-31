const usersService = require("@/services/users.service");

async function shareLocals(req, res, next) {
  const userId = req.session.get("userId");
  res.locals.auth = null;

  if (userId) {
    const user = await usersService.getById(userId);
    if (user) {
      res.locals.auth = user;
    }
  }
  next();
}

module.exports = shareLocals;
