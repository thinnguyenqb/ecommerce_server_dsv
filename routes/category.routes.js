const router = require('express').Router()
const categoryCtrl = require('../controllers/category')


router.get('/', categoryCtrl.getCategories)
router.get('/getList', categoryCtrl.getList)


module.exports = router