import { QdrantClient } from '@qdrant/js-client-rest';
import config from './config';

const qdrantClient = new QdrantClient({
  host: config.qdrantHost,
  port: config.qdrantPort,
});

async function checkQdrantConnection() {
  try {
    const health = await qdrantClient.getCollections();
    console.log('✅ Connected to Qdrant', health);
  } catch (error) {
    console.error('❌ Qdrant connection failed:', error.message);
  }
}

module.exports = {
  checkQdrantConnection,
};
