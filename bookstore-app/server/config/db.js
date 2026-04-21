const mongoose = require("mongoose");

let connectionPromise = null;

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    if (!connectionPromise) {
      connectionPromise = mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
      });
    }

    const conn = await connectionPromise;

    return conn.connection;
  } catch (error) {
    connectionPromise = null;
    throw error;
  }
};

const connectDBOrExit = async () => {
  try {
    const conn = await connectDB();
    console.log(`MongoDB Connected: ${conn.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error(
      "Make sure MongoDB is running on the URI from .env:",
      process.env.MONGO_URI
    );
    process.exit(1);
  }
};

module.exports = { connectDB, connectDBOrExit };
