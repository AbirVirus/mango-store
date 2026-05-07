import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to avoid creating a new connection on every hot reload during development.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, {
      ...opts,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    }).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    await cached.promise;
  } catch (e) {
    mongoose.disconnect();
    cached.promise = null;
    throw e;
  }

  return cached.conn = (await cached.promise).connection;
}

export default dbConnect;
