const Joi = require('joi');

const getMovies = {
  query: Joi.object().keys({
    page: Joi.number().default(1).optional(),
    search: Joi.string().trim().optional().allow('').default(''),
  }),
};

module.exports = {
  getMovies,
};
