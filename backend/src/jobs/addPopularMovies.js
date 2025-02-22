const tmdbApi = require('#apis/tmdb.api');

const main = async () => {
  const movies = await tmdbApi.getMoviesList();
  console.log(movies);
};

module.exports = main;
