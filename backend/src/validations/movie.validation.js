const Joi = require('joi');

const getMovies = {
  query: Joi.object().keys({
    page: Joi.number().default(1).optional(),
    search: Joi.string().trim().optional().allow('').default(''),
  }),
};

const getMovie = {
  params: Joi.object().keys({
    id: Joi.string().required().trim(),
  }),
};

module.exports = {
  getMovies,
  getMovie,
};
