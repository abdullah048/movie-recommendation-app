const config = require('#config/config');
const logger = require('#config/logger');
const { jobsQueue } = require('#queues/job.queue');

const jobs = [
  {
    name: 'Add Popular Movies from TMDB',
    jobName: 'addPopularMovies',
    cron: '0 0 1 * *', // 1st of every month at 00:00
    runInDev: true,
  },
  {
    name: 'Add Genres from TMDB',
    jobName: 'addGenres',
    cron: '0 0 */15 * *', // Every 15 days (approximated)
    runInDev: true,
  },
  {
    name: 'Fetch Movie Details From TMDB And Append To DB',
    jobName: 'processMoviesAndAppendToDB',
    cron: '*/15 * * * *', // Every 15 minutes
    runInDev: false,
  },
  {
    name: 'Append Searched Movies To Database',
    jobName: 'processSearchedMoviesAndAppendToDB',
    cron: '*/15 * * * *', // Every 15 minutes
    runInDev: false,
  },
];

module.exports = async () => {
  const activeJobs = config.isProduction ? jobs : jobs.filter((job) => job.runInDev);

  for (const job of activeJobs) {
    await jobsQueue.add(
      job.jobName,
      {},
      {
        repeat: { cron: job.cron },
        jobId: `repeat:${job.jobName}`,
        removeOnComplete: true,
        removeOnFail: true,
      }
    );

    logger.info(`[JOB] ${job.name} registered with CRON: ${job.cron}`);
  }
};
