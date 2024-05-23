import { AppConfig } from '../config.ts';
import { mongodb } from '../deps.ts';

export async function connectToDatabase(config: AppConfig) {
  const client = new mongodb.MongoClient();
  console.log('Connecting to MongoDB...');
  await client.connect(config.MONGODB_CONNECTION_STRING);
  return client;
}
