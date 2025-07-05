const cron = require('node-cron');
const config = require('#config/config');
const logger = require('#config/logger');
const { jobsQueue } = require('#queues/job.queue');

const jobs = [
  {
    name: 'Add Popular Movies from TMDB',
    jobName: 'addPopularMovies',
    cron: '0 0 1 * *', // 1st of every month at 00:00
    // cron: '* * * * *', // 1st of every month at 00:00
    runInDev: false,
  },
  {
    name: 'Add Genres from TMDB',
    jobName: 'addGenres',
    cron: '0 0 */15 * *', // Every 15 days
    runInDev: false,
  },
  {
    name: 'Fetch Movie Details From TMDB And Append To DB',
    jobName: 'processMoviesAndAppendToDB',
    cron: '*/15 * * * *', // Every 15 minutes
    runInDev: false,
  },
  // {
  //   name: 'Append Searched Movies To Database',
  //   jobName: 'processSearchedMoviesAndAppendToDB',
  //   cron: '*/15 * * * *', // Every 15 minutes
  //   runInDev: false,
  // },
  {
    name: 'Remove Older Movies From Database',
    jobName: 'removeOlderMoviesFromDatabase',
    cron: '0 0 1 1,5,9 *', // Every 4 months
    runInDev: false,
  },
];

module.exports = () => {
  const activeJobs = config.isProduction ? jobs : jobs.filter((job) => job.runInDev);

  activeJobs.forEach((job) => {
    cron.schedule(job.cron, async () => {
      try {
        logger.info(`[SCHEDULER] Enqueuing job: ${job.jobName}`);
        await jobsQueue.add(
          job.jobName,
          {},
          {
            removeOnComplete: true,
            removeOnFail: true,
          }
        );
      } catch (err) {
        logger.error(`[SCHEDULER] Failed to enqueue job: ${job.jobName}`, err);
      }
    });

    logger.info(`[SCHEDULER] Registered cron for: ${job.name} (${job.cron})`);
  });
};
