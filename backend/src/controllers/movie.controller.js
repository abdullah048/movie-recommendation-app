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

const getMovie = catchAsync(async (req, res) => {
  const movie = await movieService.getMovieDetail(req.params);
  res.status(httpStatus.OK).json({
    success: true,
    data: movie,
  });
});

const increaseMovieSearchCount = catchAsync(async (req, res) => {
  await movieService.incrementMovieSearchCount(req.body);
  res.status(httpStatus.OK).json({
    success: true,
  });
});

const getTrendingPosters = catchAsync(async (req, res) => {
  const data = await movieService.fetchTrendingMoviePosters();
  res.status(httpStatus.OK).json({
    success: true,
    data,
  });
});

module.exports = {
  getMovies,
  getMovie,
  increaseMovieSearchCount,
  getTrendingPosters,
};
