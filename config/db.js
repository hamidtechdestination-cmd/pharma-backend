// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// export default connectDB;


import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // ✅ yahin load karo

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("❌ Please define MONGO_URI in .env");
}

// Global cache (Vercel / Serverless fix)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // Agar already connected hai → dobara connect nahi karega
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      console.log("✅ MongoDB Connected");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};

export default connectDB;
