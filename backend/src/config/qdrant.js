const { QdrantClient } = require('@qdrant/js-client-rest');
const config = require('#config/config');

const qdrantClient = new QdrantClient({
  host: config.qdrantHost,
  port: config.qdrantPort,
});

async function checkQdrantConnection() {
  try {
    const health = await qdrantClient.versionInfo();
    console.log('✅ Connected to', health.title + ' v' + health.version);
  } catch (error) {
    console.error('❌ Qdrant connection failed:', error.message);
  }
}

module.exports = {
  checkQdrantConnection,
};
