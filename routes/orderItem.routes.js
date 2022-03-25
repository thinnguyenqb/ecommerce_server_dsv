const router = require('express').Router();
const orderItemController = require('../controllers/orderItem');
const auth = require('../middleware/auth');

router.get('/', orderItemController.getList)

router.get('/:id', orderItemController.getItem)

router.post('/', orderItemController.create)

router.put('/:id', orderItemController.update)

router.delete('/:id', orderItemController.delete)

module.exports = router