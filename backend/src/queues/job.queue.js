// job.queue.js
const { create } = require('#config/queue');
const { Worker } = require('bullmq');
const redisInstance = require('#config/redis');

const jobsQueue = create('jobs');

const jobsWorker = new Worker(
  'jobs',
  async (job) => {
    console.log(`[WORKER] Job received: ${job.name} at ${new Date().toISOString()}`);
    const { name, data } = job;
    const jobHandlers = require('#jobs/jobHandlers');
    const handler = jobHandlers[name];

    if (handler) {
      await handler(data);
    } else {
      console.error(`[WORKER] No handler found for job: ${name}`);
    }
  },
  { connection: redisInstance }
);

module.exports = { jobsQueue, jobsWorker };
