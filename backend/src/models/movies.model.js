const { toJSON } = require('./plugins/toJSON.plugin');
const { Schema, createModel, schemaTypes } = require('#utils/mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  externalId: {
    type: Number,
    required: true,
  },
  genres: {
    type: [schemaTypes.ObjectId],
    ref: 'genres',
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  posterPath: {
    type: String,
    required: false,
    default: null,
    trim: true,
  },
  backdropPath: {
    type: String,
    required: false,
    default: null,
    trim: true,
  },
  releaseDate: {
    type: String,
    required: false,
    trim: true,
    default: null,
  },
  viewCount: {
    type: Number,
    required: false,
    default: 0,
  },
  budget: {
    type: Number,
    required: false,
    default: 0,
  },
  homepageUrl: {
    type: String,
    required: false,
    trim: true,
    default: null,
  },
  imdbId: {
    type: String,
    trim: true,
    required: false,
    default: null,
  },
  productionCompanies: {
    type: schemaTypes.Mixed,
    required: false,
    default: null,
  },
  productionCountries: {
    type: schemaTypes.Mixed,
    required: false,
    default: null,
  },
  revenue: {
    type: Number,
    required: false,
    default: 0,
  },
  runtime: {
    type: Number,
    required: false,
    default: 0,
  },
  status: {
    type: String,
    required: false,
    default: null,
    trim: true,
  },
  tagline: {
    type: String,
    trim: true,
    required: false,
    default: null,
  },
  trailer: {
    type: schemaTypes.Mixed,
    required: false,
    default: null,
  },
});

schema.index(
  {
    name: 'text',
    description: 'text',
  },
  { weights: { name: 10, description: 5 } }
);

schema.index({
  externalId: 1,
});
schema.index({
  releaseDate: 1,
});
schema.index({
  viewCount: -1,
});
schema.index({
  status: 1,
});

schema.plugin(toJSON);

const model = createModel('movies', schema);

module.exports = model;
