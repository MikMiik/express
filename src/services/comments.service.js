const commentsModel = require("@/models/comments.model");

class CommentsService {
  async getAll() {
    const comments = await commentsModel.findAll();
    return comments;
  }

  async getById(id) {
    const comment = await commentsModel.findById(id);
    return comment;
  }

  async getByPostId(postId) {
    const comments = await this.getAll();
    return comments.filter((comment) => comment.post_id === +postId);
  }

  async getByUserId(userId) {
    const comments = await this.getAll();
    return comments.filter((comment) => comment.user_id === +userId);
  }

  async create(data) {
    const comment = await commentsModel.create(data);
    return comment;
  }

  async update(id, data) {
    const comment = await commentsModel.update(id, data);
    return comment;
  }

  async remove(id) {
    const result = await commentsModel.remove(id);
    return result;
  }
}

module.exports = new CommentsService();
