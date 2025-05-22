const usersService = require("@/services/users.service");

exports.index = async (req, res) => {
  const { users } = await usersService.getAll(req.query);
  res.render("admin/users/index", {
    users,
  });
};

exports.show = async (req, res) => {
  const user = await usersService.getById(req.params.id);
  res.render("admin/users/show", {
    user,
  });
};
