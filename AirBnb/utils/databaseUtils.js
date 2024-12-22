// const mysql = require('mysql2');
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "Dell@123",
//   database: "airbnb"
// });

// module.exports = pool.promise();

const mongodb = require('mongodb'); 
const MongoClient = mongodb.MongoClient;

const MONGO_URL = "mongodb+srv://root:root@airbnbmongo.oqpqa.mongodb.net/?retryWrites=true&w=majority&appName=airbnbMongo";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
  .then((client) => {
    console.log("Connected to MongoDB\n",client);
    _db = client.db('airbnbMongo');
    callback ();
  }).catch((error) => {
    console.log("Error while connecting to mongo", error)
  });
}

const getDB = () => {
  if(!_db) {
    throw new Error ('MOngo not connect');
  }
  return _db;
}

exports.getDB = getDB;

exports.mongoConnect = mongoConnect;
