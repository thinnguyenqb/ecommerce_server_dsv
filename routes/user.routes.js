const router = require('express').Router();
const userController = require('../controllers/user.controller')

router.post('/register', userController.register)

// router.post('/activation', userController.activateEmail)

// router.post('/login', userController.login)

// router.post('/forgot', userController.forgotPassword)

// router.get('/logout', userController.logout)

// router.post('/reset', authCustomer, userController.resetPassword)

// router.get('/infor', authCustomer, userController.getUserInfor)

// router.patch('/update', authCustomer, userController.updateUser)

module.exports = router