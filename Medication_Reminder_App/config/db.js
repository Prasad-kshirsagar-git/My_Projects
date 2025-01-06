const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// Ensure .env is loaded
console.log("Mongo URL:", process.env.MONGO_URL);
console.log("Mongo DB:", process.env.DB_NAME);

// Use the environment variables for MongoDB URL and Database name
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

let _db;

// MongoDB connection function
const mongoConnect = (callback) => {
  if (!MONGO_URL || !DB_NAME) {
    throw new Error("MongoDB connection URL or DB name is not defined in the .env file");
  }

  MongoClient.connect(MONGO_URL)
    .then((client) => {
      console.log("Connected to MongoDB");
      _db = client.db(DB_NAME);
      callback();
    })
    .catch((error) => {
      console.log("Error while connecting to MongoDB:", error);
    });
};

// Get the DB instance
const getDB = () => {
  if (!_db) {
    throw new Error("Database connection not established");
  }
  return _db;
};

exports.getDB = getDB;
exports.mongoConnect = mongoConnect;
