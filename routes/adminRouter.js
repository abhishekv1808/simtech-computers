const path = require('path');
const express = require('express');
const adminController = require('../controllers/adminController');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/login => GET
router.get('/login', adminController.getLogin);

// /admin/login => POST
router.post('/login', adminController.postLogin);

// /admin/logout => POST
router.post('/logout', adminController.postLogout);

// /admin/dashboard => GET
router.get('/dashboard', isAuth, adminController.getDashboard);

// /admin/add-laptop => GET
router.get('/add-laptop', isAuth, adminController.getAddLaptop);

// /admin/add-laptop => POST
router.post('/add-laptop', isAuth, adminController.postAddLaptop);

// /admin/edit-laptop/:laptopId => GET
router.get('/edit-laptop/:laptopId', isAuth, adminController.getEditLaptop);

// /admin/edit-laptop => POST
router.post('/edit-laptop', isAuth, adminController.postEditLaptop);

// /admin/delete-laptop => POST
router.post('/delete-laptop', isAuth, adminController.postDeleteLaptop);

// /admin/inventory => GET
router.get('/inventory', isAuth, adminController.getInventory);

// /admin/update-inventory => POST
router.post('/update-inventory', isAuth, adminController.postUpdateInventory);

module.exports = router;
