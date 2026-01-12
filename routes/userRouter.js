const express = require('express');
const path = require('path');
const userRouter = express.Router();
const {getHome, getLaptops, getStoreLocator, getAboutUs} = require('../controllers/userController');

userRouter.get('/', getHome);
userRouter.get('/laptops', getLaptops);
userRouter.get('/store-locator', getStoreLocator);
userRouter.get('/about-us', getAboutUs);


module.exports = userRouter;
