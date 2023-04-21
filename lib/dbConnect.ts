//old 

import mongoose from 'mongoose';

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) throw new Error('MONGODB_URI not defined');
if (!MONGODB_DB) throw new Error('MONGODB_DB not defined');

async function dbConnect() {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    console.log("DB connected mongoose");
    return;
  }
  mongoose.connection.on("connected", () => {
    console.log("connected to mongo db through mongoose");
  });
  mongoose.connection.on("error", (err) => {
    console.log(`db connection problem mongoose`, err.message);
    });
    
  return mongoose.connect(MONGODB_URI as string, {});
}

export default dbConnect;