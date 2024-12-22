const { getDB } = require("../utils/databaseUtils");

module.exports = class Favourite {

  constructor(houseId) {
    this.houseId = houseId;
  }

  save() {
    const db = getDB();
    return db.collection('favourites').findOne({houseId: this.houseId})
    .then(existingFav => {
      if(!existingFav) {
        return db.collection('favourites').insetOne(this);
      }
      return Promise.resolve();
    })
  }

  static getFavourites() {
    const db = getDB();
    return db.collection('favourites').find().toArray();
  }

  static deleteById(delHomeId) {
    const db = getDB();
    return db.collection('favourites')
    .deleteOne({houseId: delHomeId});
  }
};