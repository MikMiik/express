const usersService = require("@/services/users.service");

exports.index = async (req, res) => {
  const { items, total } = await usersService.getAll();
  res.render("admin/users/index", {
    users: items,
    total,
  });
};

exports.show = async (req, res) => {
  const user = await usersService.getById(req.user.id);
  res.render("admin/users/show", {
    user,
  });
};
