const usersService = require("@/services/users.service");
const paginationConfig = require("@/configs/pagination");
const md5 = require("md5");

exports.index = async (req, res) => {
  const { default_page, default_limit, max_limit } = paginationConfig;
  const page = +req.query.page > 0 ? +req.query.page : default_page;
  let limit = +req.query.limit > 0 ? +req.query.limit : default_limit;
  let maxLimit = max_limit;
  if (limit > maxLimit) limit = maxLimit;
  const { items, total } = await usersService.getAll(page, limit);

  res.render("admin/users/index", {
    users: items,
    total,
    limit,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  });
};

exports.show = async (req, res) => {
  user = await usersService.getById(req.params.id);
  let flash = "";
  if (user.id == "159") {
    req.flash("info", "Do not delete this user");
    flash = req.flash("info");
  }

  res.render("admin/users/show", {
    user,
    flash: flash,
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
  req.flash("success", "Create successful");
  res.redirect("/admin/users");
};

exports.edit = async (req, res) => {
  const user = await usersService.getById(req.params.id);

  res.render("admin/users/edit", {
    user,
    errors: {},
    old: {},
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
  req.flash("success", "Update successful");
  res.redirect(`/admin/users/${req.params.id}/edit`);
};

exports.forceDelete = async (req, res) => {
  await usersService.remove(req.params.id);
  req.flash("success", "Delete successful");
  res.redirect("/admin/users");
};
