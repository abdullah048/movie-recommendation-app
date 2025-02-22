const logger = require('#config/logger');
const { create } = require('#config/queue');
const redisInstance = require('#config/redis');
const addPopularMoviesJob = require('#jobs/addPopularMovies');
const { Worker } = require('bullmq');

const queue = create('jobs');

async function processJob(job) {
  console.log(`Processing job: ${job.name}`, job.data);

  switch (job.name) {
    case 'addPopularMovies':
      await addPopularMoviesJob(job.data);
      break;
    default:
      logger.error(`Unknown job type: ${job.name}`);
  }
}

const worker = new Worker('jobs', processJob, { connection: redisInstance });

module.exports = {
  jobsQueue: queue,
  jobsWorker: worker,
};
