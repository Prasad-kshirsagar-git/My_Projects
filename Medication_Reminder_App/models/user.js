const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

module.exports = class User {
  constructor(role, userName, number, email, password, securityKey = null, _id) {
    this.role = role;
    this.userName = userName;
    this.number = number;
    this.email = email;
    this.password = password;

    if(role === 'Doctor' && securityKey ) {
      this.securityKey = securityKey;
    }

    if(role === 'Patient' && securityKey ) {
      this.securityKey = securityKey;
    }

    if (_id) {
      this._id = _id;
    }
  }

  collectionName = process.env.COLLECTION_USER;

  async saveUser() {
    try {
      const db = getDB();
      return await db.collection(collectionName).insertOne(this);
    } catch (err) {
      console.error("Error saving user:", err);
      throw err;
    }
  }

  static async AllUsers(securityKey) {
    try {
      const db = getDB();
      return await db.collection(collectionName).find({securityKey: securityKey}).toArray();
    } catch (err) {
      console.error("Error fetching all users:", err);
      throw err;
    }
  }

  static async findUserById(userId) {
    try {
      if (!ObjectId.isValid(userId)) {
        throw new Error("Invalid ObjectId string");
    }
      const db = getDB();
      const id = new ObjectId(userId);
      return await db.collection(collectionName).findOne({ _id: id });
    } catch (err) {
      console.error("Error finding user by ID:", err);
      throw err;
    }
  }

  static async findUserBySecurityKey(securityKey) {
    try {
      const db = getDB();

      return await db.collection('appUsers').findOne({ securityKey: securityKey });

    } catch (err) {
      console.error("Error finding Security Key:", err);
      throw err;
    }
  }

  static async findUserByEmail(UserEmail) {
    try {
      const db = getDB();
 
      return await db.collection('appUsers').findOne({ email: UserEmail });

    } catch (err) {
      console.error("Error finding user by email:", err);
      throw err;
    }
  }

};
