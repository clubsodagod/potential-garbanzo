import mongoose, { connect, ConnectOptions, set } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_DB_URI = process.env.MONGODB_URI;

if (!MONGO_DB_URI) {
  throw new Error("MONGODB_URI environment variable not defined");
}

const options: ConnectOptions = {
  dbName: process.env.MONGODB_DB_NAME,
  user: process.env.MONGODB_USER,
  pass: process.env.MONGODB_PASS,
  authSource: process.env.MONGODB_AUTH_SOURCE,
  autoIndex: false,
  sanitizeFilter: true,
  socketTimeoutMS: process.env.MONGODB_SOCKET_TIMEOUT_MS
    ? parseInt(process.env.MONGODB_SOCKET_TIMEOUT_MS)
    : undefined,
  serverSelectionTimeoutMS: process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS
    ? parseInt(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS)
    : undefined,
};

export default async function connectToDB(): Promise<mongoose.Connection> {
  try {
    set("strictQuery", false);
    const db = await connect(MONGO_DB_URI!, options);

    console.log("MongoDB connected to", db.connection.name);

    db.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    return db.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
