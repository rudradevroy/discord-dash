import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
//maybe there is a better way to do this with mongoose

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });


const { MONGODB_URI, MONGODB_DB } = process.env;

console.log('process.env:', process.env);

if (!MONGODB_URI) throw new Error('MONGODB_URI not defined');
if (!MONGODB_DB) throw new Error('MONGODB_DB not defined');

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = {conn: null, promise: null}
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(`${MONGODB_URI}/${MONGODB_DB}`).then(mongoose => mongoose)
  }

  cached.conn = await cached.promise;
  return cached.conn
}

export default dbConnect;