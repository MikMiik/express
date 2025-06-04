const usersService = require("@/services/users.service");

async function shareLocals(req, res, next) {
  const userId = req.session.userId;
  res.locals.auth = null;
  if (userId) {
    const user = await usersService.getById(userId);
    if (user) {
      res.locals.auth = user;
    }
  }
  res.locals.flash = req.flash() || {};
  console.log(req.session.flash);
  delete req.session.flash;
  next();
}

module.exports = shareLocals;
