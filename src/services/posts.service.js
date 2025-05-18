const postsModel = require("@/models/posts.model");
const { paginate } = require("@/utils/paginate");

class PostsService {
  async getAll({ page = 1, limit = 10 } = {}) {
    const posts = await paginate(postsModel.findAll, page, limit, "posts");
    return posts;
  }

  async getById(id) {
    const post = await postsModel.findById(id);
    return post;
  }

  async create(data) {
    const post = await postsModel.create(data);
    return post;
  }

  async update(id, data) {
    const post = await postsModel.update(id, data);
    return post;
  }

  async remove(id) {
    const result = await postsModel.remove(id);
    return result;
  }
}

module.exports = new PostsService();
