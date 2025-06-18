const redisClient = require('#config/redis');

const buckets = [
  {
    id: 'trendingNow',
    title: 'Trending Now',
    query: { viewCount: { $gte: 5 } },
    isGenreBased: false,
    sort: { viewCount: -1 },
  },
  {
    id: 'topRatedThisWeek',
    title: 'Top Rated This Week',
    query: { releaseDate: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, viewCount: { $gte: 3 } },
    sort: { viewCount: -1 },
    isGenreBased: false,
  },
  {
    id: 'mostWatched',
    title: 'Most Watched on Our Platform',
    query: { viewCount: { $gte: 1000 } },
    sort: { viewCount: -1 },
    isGenreBased: false,
  },
  {
    id: 'hiddenGems',
    title: 'Hidden Gems',
    query: {
      $and: [{ viewCount: { $gte: 7 } }, { viewCount: { $lt: 100 } }],
    },
    sort: { viewCount: -1 },
    isGenreBased: false,
  },
  {
    id: 'unseenByMost',
    title: 'Unseen by Most Users',
    query: { viewCount: { $lt: 10 } },
    sort: {},
    isGenreBased: false,
  },
  {
    id: 'recentlyAdded',
    title: 'Recently Added to Our Collection',
    query: { createdAt: { $gte: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) } },
    sort: { createdAt: -1 },
    isGenreBased: false,
  },
  {
    id: 'throwbackClassics',
    title: 'Throwback Classics',
    query: { releaseDate: { $lte: new Date(Date.now() - 10 * 365 * 24 * 60 * 60 * 1000) } },
    sort: { viewCount: -1 },
    isGenreBased: false,
  },
  {
    id: 'thrillers',
    title: 'Heart-Racing Thrillers',
    query: { genres: 'Thriller' },
    sort: { viewCount: -1 },
    isGenreBased: true,
  },
  {
    id: 'feelGood',
    title: 'Feel-Good Movies',
    isGenreBased: true,
    query: {
      genres: { $in: ['Comedy', 'Drama'] },
    },
    sort: { viewCount: -1 },
    isGenreBased: true,
  },
  {
    id: 'sciFi',
    title: 'Mind-Bending Sci-Fi',
    query: { genres: 'Science Fiction', viewCount: { $gte: 5 } },
    sort: { viewCount: -1 },
    isGenreBased: true,
  },
  {
    id: 'tearjerkers',
    title: 'Tearjerkers',
    query: {
      genres: 'Drama',
    },
    sort: { viewCount: -1 },
    isGenreBased: true,
  },
  {
    id: 'youMightLike',
    title: 'You Might Like These',
    query: {},
    sort: {},
    useSample: true,
  },
  {
    id: 'randomPicks',
    title: 'Completely Random Picks',
    query: {},
    sort: {},
    useSample: true,
  },
  {
    id: 'bigBudget',
    title: 'Big Budget Movies',
    query: {},
    sort: { budget: -1 },
  },
  {
    id: 'highRevenue',
    title: 'High Revenue Movies',
    query: {},
    sort: { revenue: -1 },
  },
];

const CACHE_KEY = 'homepage:buckets';
const CACHE_TTL_SECONDS = 86400;

const getHomepageBuckets = async (limit = 8) => {
  const cached = await redisClient.get(CACHE_KEY);

  if (cached) {
    return JSON.parse(cached);
  }

  const selected = getRandomBuckets(limit);
  await redisClient.set(CACHE_KEY, JSON.stringify(selected), 'EX', CACHE_TTL_SECONDS);
  return selected;
};

const getRandomBuckets = (count) => {
  const shuffled = [...buckets].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

module.exports = {
  getRandomBuckets,
  getHomepageBuckets,
};
