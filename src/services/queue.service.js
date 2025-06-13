const queueModel = require("@/models/queue.model");

class QueueService {
  async getPendingJobs() {
    const queue = await queueModel.findPendingJobs();
    return queue;
  }
  async create(data) {
    const queue = await queueModel.create(data);
    return queue;
  }

  async update(id, data) {
    const queue = await queueModel.update(id, data);
    return queue;
  }

  async remove(id) {
    const result = await queueModel.remove(id);
    return result;
  }
}

module.exports = new QueueService();
