const redisClient = require('#config/redis');

const main = async (movieResult) => {
  if (!movieResult) {
    console.log('Nothing to add into the db', movieResult?.result?.length);
    return;
  }
  try {
    const ids = [];
    for (let page = movieResult.page || 1; page <= movieResult.total_pages; page++) {
      movieResult.results.forEach((movie) => ids.push(movie.id));
    }

    if (ids.length) {
      console.log(ids.length);
      await redisClient.del('tmdb_searched_movie_ids');
      await redisClient.rpush('tmdb_searched_movie_ids', ids);
    }
  } catch (error) {
    console.log('Error in addSearchedMovies job: ' + error);
  }
};

module.exports = main;
