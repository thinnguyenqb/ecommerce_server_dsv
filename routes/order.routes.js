const router = require('express').Router();
const orderController = require('../controllers/order');
const auth = require('../middleware/auth');

router.get('/', orderController.getList)

router.get('/:id', orderController.getItem)

router.post('/', orderController.create)

router.put('/:id', orderController.update)

router.delete('/:id', orderController.delete)

module.exports = router