const usersService = require("@/services/users.service");
const { formatDate, formatDay } = require("@/utils/dayjsFormat");
const getVisiblePages = require("@/utils/getVisiblePages");

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
  delete req.session.flash;

  res.locals.formatDate = formatDate;
  res.locals.formatDay = formatDay;
  res.locals.getVisiblePages = getVisiblePages;
  next();
}

module.exports = shareLocals;
