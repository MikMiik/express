const commentsService = require("@/services/comments.service");

exports.index = async (req, res) => {
  const { items, total } = await commentsService.getAll();
  res.render("admin/comments/index", {
    comments: items,
    total,
  });
};

exports.show = async (req, res) => {
  const comment = await commentsService.getById(req.comment.id);
  res.render("admin/comments/show", {
    comment,
  });
};
