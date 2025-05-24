const sidebarItems = require("@/configs/admin/sidebarItems");
function handleSidebar(req, res, next) {
  res.locals.path = req.path;
  res.locals.sidebarItems = sidebarItems;
  next();
}

module.exports = handleSidebar;
