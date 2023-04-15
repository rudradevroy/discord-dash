import { FC, useRef } from 'react';
import Button from '@/components/ui/Button';
import dotenv from 'dotenv';
import path from 'path';
import { MongoClient, Db } from 'mongodb';
import type { MongoClientOptions } from 'mongodb';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

console.log('process.env:', process.env);

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const { MONGODB_URI, MONGODB_DB } = process.env;
  const clientRef = useRef<MongoClient | null>(null);

  async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
    const options: MongoClientOptions & { retryWrites?: boolean } = {
      useUnifiedTopology: true,
      retryWrites: false,
    };

    const client = await MongoClient.connect(MONGODB_URI!, options);
    console.log('Connected successfully to server');
    const db = client.db(MONGODB_DB!);

    return { client, db };
  }

  async function performMongoOperation() {
    if (!clientRef.current) {
      const { client } = await connectToDatabase();
      clientRef.current = client;
    }

    try {
      const db = clientRef.current.db(MONGODB_DB!);
      const collection = db.collection('test');
      const result = await collection.insertOne({ message: 'Hello from MongoDB' });

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Button size={'lg'} variant={'default'} onClick={performMongoOperation}>
        Perform MongoDB Operation
      </Button>
    </>
  );
};

export default Page;
