const mongodb = require('mongodb'); 
const MongoClient = mongodb.MongoClient;

const MONGO_URL = "mongodb+srv://root:root@appusers.612ek.mongodb.net/?retryWrites=true&w=majority&appName=appUsers";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
  .then((client) => {
    console.log("Connected to MongoDB\n",client);
    _db = client.db('appUsers');
    callback ();
  }).catch((error) => {
    console.log("Error while connecting to mongo", error)
  });
}

const getDB = () => {
  if(!_db) {
    throw new Error ("Error : connection fail");
  }
  return _db;
}

exports.getDB = getDB;

exports.mongoConnect = mongoConnect;
