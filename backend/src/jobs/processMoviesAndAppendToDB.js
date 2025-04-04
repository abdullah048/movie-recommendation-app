const tmdbApi = require('#apis/tmdb.api');
const redisClient = require('#config/redis');
const { updateMoviesFromTMDB } = require('#services/movies.service');

const BATCH_SIZE = 20;

const main = async () => {
  const ids = [];
  try {
    for (let i = 0; i < BATCH_SIZE; i++) {
      const id = await redisClient.lpop('tmdb_popular_movie_ids');
      if (!id) break;
      ids.push(id);
    }
    if (!ids.length) return console.log('No movies to process.');
    for (const movieId of ids) {
      const [details, videos] = await Promise.all([tmdbApi.getMovieDetails(movieId), tmdbApi.getMovieTrailers(movieId)]);
      await updateMoviesFromTMDB({ ...details, trailer: videos?.results[0] ?? null });
    }
  } catch (error) {
    console.log('Error in processMoviesAndAppendToDB job: ' + error);
  }
};

module.exports = main;
