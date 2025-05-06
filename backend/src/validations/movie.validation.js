const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getMovies = {
  query: Joi.object().keys({
    page: Joi.number().default(1).optional(),
    search: Joi.string().trim().optional().allow('').default(''),
  }),
};

const getMovie = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required().trim(),
  }),
};

const increaseSearchCount = {
  body: Joi.object().keys({
    id: Joi.string().custom(objectId).required().trim(),
  }),
};

module.exports = {
  getMovies,
  getMovie,
  increaseSearchCount,
};
