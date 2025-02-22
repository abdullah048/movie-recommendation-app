const { Queue } = require('bullmq');
const config = require('#config/config');
const redisInstance = require('#config/redis');

// Function to get the total length of the queue for a specific key (considering waiting, active, and delayed jobs)
async function getQueueLengthByKey(queue, key) {
  const jobs = await queue.getJobs([]);
  return jobs.filter((job) => job?.name === key).length;
}

// Function to remove the oldest job with a specific key if the queue length for that key exceeds the limit
async function removeOldestJobByKeyIfNeeded(queue, key) {
  const currentLength = await getQueueLengthByKey(queue, key);
  const threshold = config.redisRolloutThreshold;
  if (currentLength >= threshold) {
    const oldestJobs = await queue.getJobs(['waiting', 'active', 'delayed', 'failed', 'completed'], 0, -1, 'asc');
    const filteredOldestJobs = oldestJobs.filter((job) => job?.name === key).slice(0, config.redisRolloutLimit); // Get the oldest jobs in waiting state with the specific key
    // Iterate over each job and remove it
    await Promise.all(
      filteredOldestJobs.map(async (job) => {
        await job.remove(); // Remove the job
        console.log(`Removed job ${job.id} with key ${key}`);
      })
    );
  }
}

function create(name) {
  if (!name) throw new Error('Queue name is required');
  const queue = new Queue(name, {
    connection: redisInstance,
  });

  const originalAdd = queue.add.bind(queue);
  queue.add = async function (jobData, opts) {
    const key = jobData;
    if (key) {
      await removeOldestJobByKeyIfNeeded(queue, key);
    }
    return originalAdd(jobData, opts);
  };

  return queue;
}

module.exports = {
  create,
};
