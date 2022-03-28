const router = require('express').Router()
const productCtrl = require('../controllers/product')


router.get('/', productCtrl.getList)

router.post('/', productCtrl.productFilter);

router.get('/:id', productCtrl.getItem)

router.post('/', productCtrl.create);

router.put('/:id', productCtrl.update);



module.exports = router