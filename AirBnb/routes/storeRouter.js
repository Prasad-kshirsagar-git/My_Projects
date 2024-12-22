// Core Module
const path = require('path');

// External Module
const express = require('express');
const storeRouter = express.Router();

const storeController = require("../controllers/storeController");

// first get middleware
storeRouter.get("/", storeController.getIndex);
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/homes", storeController.getHome);
storeRouter.get("/favourites", storeController.getFavouriteList);
storeRouter.get("/homes/:homeId",storeController.getHomeDetails)

storeRouter.post("/favourites", storeController.postAddToFavourite);
storeRouter.post("/favourites/delete/:homeId", storeController.postRemoveFromFavourite);

module.exports = storeRouter;
