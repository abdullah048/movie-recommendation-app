// job.queue.js
const { create } = require('#config/queue');
const { Worker } = require('bullmq');
const redisInstance = require('#config/redis');

const jobsQueue = create('jobs');

const jobsWorker = new Worker(
  'jobs',
  async (job) => {
    const { name, data } = job;
    const jobHandlers = require('#jobs/jobHandlers'); // Import mapping
    const handler = jobHandlers[name];

    if (handler) {
      await handler(data);
    } else {
      console.error(`No handler found for job: ${name}`);
    }
  },
  { connection: redisInstance }
);

module.exports = { jobsQueue, jobsWorker };
