const config = require('#config/config');
const logger = require('#config/logger');
const { jobsQueue } = require('#queues/job.queue');

const MINUTE = 1000 * 60;

const jobs = [
  {
    name: 'Add Popular Movies from TMDB',
    handler: () => jobsQueue.add('addPopularMovies', {}),
    interval: MINUTE * 24 * 60,
    // runInDev: true,
  },
];

module.exports = () => {
  const activeJobs = [];

  if (!config.isProduction) {
    const filtered = jobs.filter((item) => item.runInDev);
    activeJobs.push(...filtered);
  } else {
    activeJobs.push(...jobs);
  }

  activeJobs.forEach((job) => {
    const { name, handler, interval } = job;
    logger.info(`[JOB] ${name} registered (${interval / 1000 / 60}m)`);

    handler();
    setInterval(handler, interval);
  });
};
