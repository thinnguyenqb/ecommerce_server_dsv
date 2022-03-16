const router = require('express').Router();
const userController = require('../controllers/user.controller');
const authCustomer = require('../middleware/authCustomer');

router.post('/register', userController.register)

router.post('/activation', userController.activateEmail)

router.post('/login', userController.login)

router.post('/forgot', userController.forgotPassword)

router.post('/reset', authCustomer, userController.resetPassword)

router.get('/infor', authCustomer, userController.getUserInfor)

//router.get('/logout', userController.logout)

// router.patch('/update', authCustomer, userController.updateUser)

module.exports = router