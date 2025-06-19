const config = require('#config/config');
const logger = require('#config/logger');
const { jobsQueue } = require('#queues/job.queue');

const MINUTE = 1000 * 60;

const jobs = [
  {
    name: 'Add Popular Movies from TMDB',
    handler: () => jobsQueue.add('addPopularMovies', {}),
    interval: MINUTE * 60 * 24 * 30,
    runInDev: false,
  },
  {
    name: 'Add Genres from TMDB',
    handler: () => jobsQueue.add('addGenres', {}),
    interval: MINUTE * 60 * 24 * 15,
    runInDev: false,
  },
  {
    name: 'Fetch Movie Details From TMDB And Append To DB',
    handler: () => jobsQueue.add('processMoviesAndAppendToDB', {}),
    interval: MINUTE * 15,
    runInDev: true,
  },
  {
    name: 'Append Searched Movies To Database',
    handler: () => jobsQueue.add('processSearchedMoviesAndAppendToDB', {}),
    interval: MINUTE * 15,
    runInDev: true,
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
