const usersService = require("@/services/users.service");

exports.index = async (req, res) => {
  const { users } = await usersService.getAll({ page: 1, limit: 20 });
  res.render("admin/dashboard/index", {
    tilte: "Users list",
    users,
  });
};
