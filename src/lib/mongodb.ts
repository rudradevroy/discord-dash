import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

const { MONGODB_URI, MONGODB_DB } = process.env;

console.log('process.env:', process.env);


if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env');
}

interface CachedClient {
  client: MongoClient;
  db: Db;
}

let cachedClient: CachedClient;

export async function connectToDatabase(): Promise<CachedClient> {
  if (cachedClient) {
    return cachedClient;
  }

  console.log('MONGODB_URI:', MONGODB_URI);
  const client = await MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db(MONGODB_DB);

  cachedClient = { client, db };

  return cachedClient;
}
