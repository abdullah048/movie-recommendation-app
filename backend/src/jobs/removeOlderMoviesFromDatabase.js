const { deleteFiveYearOldMovies } = require('#services/movies.service');

const main = async () => {
  try {
    await deleteFiveYearOldMovies();
  } catch (error) {
    console.log('Error in removeOlderMoviesFromDatabase job: ' + error);
  }
};

module.exports = main;
