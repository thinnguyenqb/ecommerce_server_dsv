const router = require('express').Router();
const orderController = require('../controllers/order');
const auth = require('../middleware/auth');
const authSeller = require('../middleware/authSeller')

router.get('/', auth, authSeller, orderController.getList)

router.get('/:id', auth, orderController.getItem)

router.post('/', auth, orderController.create)

router.put('/:id', auth, orderController.update)

router.delete('/:id', auth, orderController.delete)

module.exports = router