const Redis = require('ioredis');
const config = require('#config/config');

const redisClient = new Redis({
  host: config.redisUri,
  port: config.redisPort,
  maxRetriesPerRequest: null,
});

redisClient.on('connect', () => console.log('✅ Connected to Redis'));
redisClient.on('error', (err) => console.error('❌ Redis Error:', err));

module.exports = redisClient;
