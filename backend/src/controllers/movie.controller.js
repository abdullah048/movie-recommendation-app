const httpStatus = require('http-status');
const catchAsync = require('#utils/catchAsync');
const movieService = require('#services/movies.service');

const getMovies = catchAsync(async (req, res) => {
  const movies = await movieService.getPaginatedMovies(req.query);
  res.status(httpStatus.OK).json({
    success: true,
    data: movies,
  });
});

module.exports = {
  getMovies,
};
