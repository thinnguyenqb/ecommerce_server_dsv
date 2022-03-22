const router = require('express').Router()
const categoryCtrl = require('../controllers/category.controller')


router.get('/', categoryCtrl.getCategories)


module.exports = router