const usersService = require("@/services/users.service");
const { formatDate, formatDay } = require("@/utils/dayjsFormat");

exports.index = async (req, res) => {
  const { items, total } = await usersService.getAll();
  res.render("admin/users/index", {
    users: items,
    total,
  });
};

exports.show = async (req, res) => {
  user = await usersService.getById(req.params.id);
  res.render("admin/users/show", {
    user,
    formatDate,
    formatDay,
  });
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

exports.edit = async (req, res) => {
  user = await usersService.getById(req.params.id);
  res.render("admin/users/edit", {
    user,
    formatDate,
    formatDay,
  });
};
