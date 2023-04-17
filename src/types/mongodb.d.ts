// for integrating with MongoDB

import { MongoClient } from 'mongodb'


declare global {
  var _mongoClientPromise: Promise<MongoClient>
}