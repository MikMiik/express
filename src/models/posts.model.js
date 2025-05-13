const db = require("@/configs/db");

exports.getPosts = async () => {
  const [posts] = await db.query("select * from posts");
  return posts;
};

exports.getPost = async (id) => {
  const [post] = await db.query("SELECT * FROM `posts`", [id, id]);
  return post[0];
};
