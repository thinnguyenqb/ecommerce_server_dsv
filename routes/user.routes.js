const router = require('express').Router();
const userController = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/register', userController.register)

router.post('/activation', userController.activateEmail)

router.post('/login', userController.login)

router.post('/forgot', userController.forgotPassword)

router.post('/reset', auth, userController.resetPassword)

router.post('/change', auth, userController.changePassword)

router.get('/infor', auth, userController.getUserInfor)

//router.get('/logout', userController.logout)

router.patch('/update', auth, userController.updateUser)

router.post('/seller-login', userController.login)

module.exports = router