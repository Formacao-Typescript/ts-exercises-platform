import { AppConfig } from '../config.ts';
import { Db, MongoClient } from 'mongodb';

export function connectToDatabase(config: AppConfig) {
  const { promise, resolve, reject } = Promise.withResolvers<{
    database: Db;
    disconnect: (typeof client)['close'];
  }>();

  console.log('Connecting to MongoDB...');
  const client = new MongoClient(config.MONGODB_CONNECTION_STRING, {
    pkFactory: { createPk: () => crypto.randomUUID() },
  });
  client.on('connectionReady', () => {
    console.log('Connected to MongoDB');
  });

  client.on('error', err => {
    console.error('Failed to connect to MongoDB', err);
    reject(err);
  });

  // this is the weirdest shit of all, the client resolves without sending any events
  // so we basically state we want a connection and it defers the connection until it's used
  console.log('Connection created');
  resolve({
    database: client.db(config.MONGODB_DATABASE),
    disconnect: client.close,
  });
  return promise;
}
