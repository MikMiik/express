const postsService = require("@/services/posts.service");

exports.index = async (req, res) => {
  const { posts } = await postsService.getAll(req.query);
  res.render("admin/posts/index", {
    posts,
  });
};

exports.show = async (req, res) => {
  const post = await postsService.getById(req.params.id);
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
