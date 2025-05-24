const postsService = require("@/services/posts.service");

exports.index = async (req, res) => {
  const { items, total } = await postsService.getAll(req.page, req.limit);
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

exports.create = async (req, res) => {
  const newPost = await postsService.create(req.body);
  res.render("admin/posts/index", {
    newPost,
  });
};
