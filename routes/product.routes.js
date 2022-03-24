const router = require('express').Router()
const productCtrl = require('../controllers/product')


router.get('/', productCtrl.getList)

router.get('/:id', productCtrl.getItem)

router.post('/', productCtrl.createProduct);



module.exports = router