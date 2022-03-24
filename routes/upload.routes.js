const router = require('express').Router();
const uploadController = require('../controllers/upload');
const uploadImage = require('../middleware/uploadImage')
const auth = require('../middleware/auth')
const authSeller = require('../middleware/authSeller')

router.post('/', uploadImage, auth, authSeller, uploadController.uploadImg)

module.exports = router