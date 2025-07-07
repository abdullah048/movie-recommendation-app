const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development').required(),
    PORT: Joi.number().default(8000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    TMDB_API_KEY: Joi.string().required().description('TMDB Api key'),
    TMDB_BASE_URL: Joi.string().required().description('TMDB Api key'),
    REDIS_HOST: Joi.string().description('Redis Uri').default('127.0.0.1'),
    REDIS_PORT: Joi.number().description('Redis Port').default(6379),
    REDIS_ROLLOUT_THRESHOLD: Joi.number().description('Redis Rollout Threshold').default(3000),
    REDIS_ROLLOUT_LIMIT: Joi.number().description('Redis Rollout Limit').default(20),
    QDRANT_HOST: Joi.string().description('Qdrant Uri').default('127.0.0.1'),
    QDRANT_PORT: Joi.number().description('Qdrant Port').default(6333),
    MAX_MOVIES_COUNT: Joi.number().description('Maximum movies to pull from TMDB').default(600),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  environment: envVars.NODE_ENV,
  get isProduction() {
    return this.environment === 'production';
  },
  get protocol() {
    return this.isProduction ? 'https' : 'http';
  },
  port: envVars.PORT,
  redisHost: envVars.REDIS_HOST,
  redisPort: envVars.REDIS_PORT,
  redisRolloutThreshold: envVars.REDIS_ROLLOUT_THRESHOLD,
  redisRolloutLimit: envVars.REDIS_ROLLOUT_LIMIT,
  qdrantHost: envVars.QDRANT_HOST,
  qdrantPort: envVars.QDRANT_PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  apis: {
    tmdb: {
      apiKey: envVars.TMDB_API_KEY,
      baseURL: envVars.TMDB_BASE_URL,
      imageBaseURL: envVars.TMDB_IMAGE_BASE_URL,
      maxMoviesCount: envVars.MAX_MOVIES_COUNT,
    },
  },
};
