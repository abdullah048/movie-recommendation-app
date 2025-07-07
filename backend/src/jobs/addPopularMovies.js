const tmdbApi = require('#apis/tmdb.api');
const config = require('#config/config');
const redisClient = require('#config/redis');
const { getTotalMoviesInDBCount } = require('#services/movies.service');
const moment = require('moment');

const main = async () => {
  try {
    const totalMovies = await getTotalMoviesInDBCount();
    if (config.apis.tmdb.maxMoviesCount === totalMovies) {
      console.log(`✅ Reached the maximum allowed movie count (${totalMovies}). No more movies will be fetched from TMDB.`);
      return;
    }
    const ids = [];
    const twoYearsAgo = moment().subtract(2, 'years').format('YYYY-MM-DD');
    for (let page = 1; page <= 15; page++) {
      const res = await tmdbApi.getMoviesList(page);
      res.results.forEach((movie) => {
        const releaseDate = movie.release_date;
        const isAdultMovie = movie.adult || false;
        // Skip if release date is empty/null/undefined
        if (!releaseDate) return;
        // Skip if it is an adult movie (18+)
        if (isAdultMovie) return;
        // Skip if release date is older than 2 years
        if (releaseDate < twoYearsAgo) return;
        ids.push(movie.id);
      });
    }

    if (ids.length) {
      await redisClient.del('tmdb_popular_movie_ids');
      await redisClient.rpush('tmdb_popular_movie_ids', ids);
    }
  } catch (error) {
    console.log('Error in addPopularMovies job: ' + error);
  }
};

module.exports = main;
