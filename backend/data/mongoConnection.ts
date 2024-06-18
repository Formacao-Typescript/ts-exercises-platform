import { AppConfig } from '../config.ts';
import { MongoClient } from 'mongodb';

export function connectToDatabase(config: AppConfig) {
  console.log('Connecting to MongoDB...');
  const client = new MongoClient(config.MONGODB_CONNECTION_STRING, {
    pkFactory: { createPk: () => crypto.randomUUID() },
  });
  client.on('connectionReady', () => {
    console.log('Connected to MongoDB');
  });
  return client.db(config.MONGODB_DATABASE);
}
