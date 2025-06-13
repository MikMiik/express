require("module-alias/register");
require("dotenv").config();
const queueService = require("@/services/queue.service");
const sendVerifyEmailJob = require("@/jobs/sendVerifyEmailJob");

const handlers = {
  sendVerifyEmailJob,
};

async function queueWorker() {
  while (true) {
    const jobs = await queueService.getPendingJobs();
    for (let job of jobs) {
      await jobProcess(job);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

async function jobProcess(job) {
  const handler = handlers[job.type];
  if (handler) {
    try {
      await queueService.update(job.id, { status: "processing" });
      await handler(job);
      await queueService.update(job.id, { status: "completed" });
    } catch (error) {
      await queueService.update(job.id, { status: "reject" });
    }
  }
}

queueWorker();
