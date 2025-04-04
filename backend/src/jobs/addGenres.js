const tmdbApi = require('#apis/tmdb.api');
const { updateGenresFromTMDB } = require('#services/genre.service');

const main = async () => {
  try {
    const genres = await tmdbApi.getMovieGenres();
    await updateGenresFromTMDB(genres);
  } catch (error) {
    console.log('Error in addGenres job: ' + error);
  }
};

module.exports = main;
