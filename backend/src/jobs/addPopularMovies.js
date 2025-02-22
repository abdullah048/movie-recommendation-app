const tmdbApi = require('#apis/tmdb.api');

const main = async () => {
  const movies = await tmdbApi.getMovieGenres();
  console.log(movies);
};

module.exports = main;
