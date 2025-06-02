const usersService = require("@/services/users.service");
const { formatDate, formatDay } = require("@/utils/dayjsFormat");
const md5 = require("md5");

exports.index = async (req, res) => {
  const { items, total } = await usersService.getAll();
  res.render("admin/users/index", {
    users: items,
    total,
    formatDate,
    formatDay,
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
  let { confirm_password, ...body } = req.body;
  const avatar = req.file
    ? `/uploads/${req.file.filename}`
    : `/uploads/default-avatar.jpg`;
  body.avatar = avatar;
  await usersService.create(body);
  res.setFlash({
    type: "success",
    message: "Create success",
  });
  res.redirect("/admin/users");
};

exports.edit = async (req, res) => {
  const user = await usersService.getById(req.params.id);
  res.render("admin/users/edit", {
    user,
    errors: {},
    old: {},
    formatDate,
    formatDay,
  });
};

exports.update = async (req, res) => {
  let { confirm_password, password, ...body } = req.body;
  const avatar = req.file ? `/uploads/${req.file.filename}` : null;
  if (avatar) {
    body.avatar = avatar;
  }
  if (password) {
    body.password = md5(password);
  }
  await usersService.update(req.params.id, body);
  res.redirect(`/admin/users/${req.params.id}/edit`);
};

exports.forceDelete = async (req, res) => {
  await usersService.remove(req.params.id);
  res.redirect("/admin/users");
};
