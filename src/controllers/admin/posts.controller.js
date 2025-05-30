const postsService = require("@/services/posts.service");
const { formatDate, formatDay } = require("@/utils/dayjsFormat");

exports.index = async (req, res) => {
  const { items, total } = await postsService.getAll();
  res.render("admin/posts/index", {
    posts: items,
    total,
    formatDate,
    formatDay,
  });
};

exports.show = async (req, res) => {
  const post = await postsService.getById(req.params.id);
  res.render("admin/posts/show", {
    post,
  });
};

exports.create = async (req, res) => {
  res.render("admin/posts/create", {
    errors: {},
    old: {},
  });
};

exports.edit = async (req, res) => {
  const post = await postsService.getById(req.params.id);
  res.render("admin/posts/edit", {
    post,
    errors: {},
    old: {},
    formatDate,
    formatDay,
  });
};
