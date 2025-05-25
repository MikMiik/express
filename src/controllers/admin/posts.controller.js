const postsService = require("@/services/posts.service");

exports.index = async (req, res) => {
  const { items, total } = await postsService.getAll();
  res.render("admin/posts/index", {
    posts: items,
    total,
  });
};

exports.show = async (req, res) => {
  const post = await postsService.getById(req.post.id);
  res.render("admin/posts/show", {
    post,
  });
};

exports.edit = async (req, res) => {
  const post = await postsService.getById(req.post.id);
  res.render("admin/posts/edit", {
    post,
  });
};

exports.create = async (req, res) => {
  // const post = await postsService.create(req.body);
  res.render("admin/posts/create");
};
