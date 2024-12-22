const mysql = require("mysql2");
const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/databaseUtils");

module.exports = class User {
  constructor(userName, number, email, password, _id) {
    this.userName = userName;
    this.number = number;
    this.email = email;
    this.password = password;

    if (_id) {
      this._id = _id;
    }
  }

  saveUser(userName, number, email, password) {

    const db = getDB();
    return db.collection("appUsers").insertOne(this);
  }

  static fetchAllUsers(userId) {
    const db = getDB();
    return db.collection("appUsers").find().toArray();
  }

  static findUserByEmail(userEmail) {
    const db = getDB();
    return db.collection("appUsers").find({ email: userEmail }).next();
  }

  authentication(userEmail, userPassword) {
    const db = getDB();
    return db.collection("appUsers").find({ email: userEmail, password: userPassword }).next();
  }
};
