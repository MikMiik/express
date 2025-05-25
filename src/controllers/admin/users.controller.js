const usersService = require("@/services/users.service");

exports.index = async (req, res) => {
  const { items, total } = await usersService.getAll();
  res.render("admin/users/index", {
    users: items,
    total,
  });
};

exports.show = async (req, res) => {
  res.render("admin/users/show");
};

exports.create = async (req, res) => {
  res.render("admin/users/create", {
    errors: {},
    old: {},
  });
};

exports.store = async (req, res) => {
  const { confirm_password, ...body } = req.body;
  const user = await usersService.create(body);
  res.redirect("/admin/users");
};
