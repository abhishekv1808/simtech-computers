const express = require('express');
const path = require('path');
const userRouter = express.Router();
const {getHome, getLaptops} = require('../controllers/userController');

userRouter.get('/', getHome);
userRouter.get('/laptops', getLaptops);


module.exports = userRouter;
