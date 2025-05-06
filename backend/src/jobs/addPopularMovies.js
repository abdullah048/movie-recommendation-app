const tmdbApi = require('#apis/tmdb.api');
const redisClient = require('#config/redis');

const main = async () => {
  try {
    const ids = [];
    for (let page = 1; page <= 15; page++) {
      const res = await tmdbApi.getMoviesList(page);
      res.results.forEach((movie) => ids.push(movie.id));
    }

    if (ids.length) {
      console.log(ids.length);
      await redisClient.del('tmdb_popular_movie_ids');
      await redisClient.rpush('tmdb_popular_movie_ids', ids);
    }
  } catch (error) {
    console.log('Error in addPopularMovies job: ' + error);
  }
};

module.exports = main;
