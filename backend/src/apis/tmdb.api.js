const axios = require('axios');
const config = require('#config/config');
const ApiError = require('#utils/ApiError');
const httpStatus = require('http-status');

const instance = axios.create({
  baseURL: config.apis.tmdb.baseURL,
  headers: {
    Authorization: `Bearer ${config.apis.tmdb.apiKey}`,
    'Content-Type': 'application/json',
  },
});

const onFulfilled = (response) => {
  const { data } = response;
  return data;
};

const onRejected = (err) => {
  if (err.response?.data === 'Unauthorized') {
    throw new ApiError(httpStatus.UNAUTHORIZED, `${err.response.data}`, err.response.data);
  }
  const { status, title, detail } = err.response.data;
  throw new ApiError(`${title || detail}`, 500, status);
};

instance.interceptors.response.use(onFulfilled, onRejected);

const getMoviesList = async () => {
  return instance.get('/movie/popular?language=en-US&page=1');
};

const getMovieGenres = async () => {
  return instance.get('/genre/movie/list?language=en');
};

module.exports = {
  getMoviesList,
  getMovieGenres,
};
