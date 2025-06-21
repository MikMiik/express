const sequelize = require("@/configs/database");
const { DataTypes } = require("sequelize");
const Post = sequelize.define(
  "Post",
  {
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
    },
    title: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.STRING,
    },
    post_img: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "posts",
    underscored: true,
    timestamps: true,
  },
);

module.exports = Post;
