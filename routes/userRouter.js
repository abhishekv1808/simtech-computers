const express = require('express');
const path = require('path');
const userRouter = express.Router();
const {
    getHome, 
    getLaptops, 
    getStoreLocator, 
    getAboutUs, 
    getContactUs,
    getLaptopsByBrand,
    getProductDetail,
    getCompareLaptops
} = require('../controllers/userController');

userRouter.get('/', getHome);
userRouter.get('/laptops', getLaptops);
userRouter.get('/brand/:brandName', getLaptopsByBrand);
userRouter.get('/compare-laptops', getCompareLaptops);
userRouter.get('/laptop/:id', getProductDetail);
userRouter.get('/store-locator', getStoreLocator);
userRouter.get('/about-us', getAboutUs);
userRouter.get('/contact-us', getContactUs);


module.exports = userRouter;
