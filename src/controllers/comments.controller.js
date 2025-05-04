const { readDB, writeDB } = require("../utils/files.util");

const index = async (req, res) => {
  const comments = await readDB("comments");
  res.json({
    status: "success",
    comments,
  });
};

const show = async (req, res) => {
  const comments = await readDB("comments");
  const comment = comments.find((comment) => comment.id === +req.params.id);
  if (!comment) {
    res.json({
      status: "error",
      message: "Not found",
    });
    return;
  }
  res.json({
    status: "success",
    data: comment,
  });
};

const store = async (req, res) => {
  const comments = await readDB("comments");
  const newcomment = {
    id: comments.length ? comments[comments.length - 1].id + 1 : 1,
    post_id: comments.length ? comments[comments.length - 1].id + 1 : 1,
    comment: req.body.content,
  };
  comments.push(newcomment);
  await writeDB("comments", comments);
  res.json({
    status: "success",
    data: newcomment,
  });
};

const update = async (req, res) => {
  const comments = await readDB("comments");
  const commentPut = comments.findIndex(
    (comment) => comment.id === +req.params.id
  );
  if (commentPut === -1) {
    res.json({
      status: "error",
      message: "Not found",
    });
    return;
  }
  comments[commentPut].content = req.body.content;
  await writeDB("comments", comments);
  res.status(200).json({
    status: "success",
    message: "comment updated successfully",
  });
};

const destroy = async (req, res) => {
  const comments = await readDB("comments");
  const commentDelete = comments.findIndex(
    (comment) => comment.id === +req.params.id
  );
  if (commentDelete === -1) {
    res.json({
      status: "error",
      message: "Not found",
    });
    return;
  }
  comments.splice(commentDelete, 1);
  await writeDB("comments", comments);
  res.status(200).send();
};

module.exports = { index, show, store, update, destroy };
