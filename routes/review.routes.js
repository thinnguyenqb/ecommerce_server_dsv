const router = require('express').Router();
const reviewController = require('../controllers/review');
const auth = require('../middleware/auth');

router.get('/', reviewController.getList)

router.get('/:id', reviewController.getItem)

router.post('/', reviewController.create)

router.put('/:id', reviewController.update)

router.delete('/:id', reviewController.delete)

module.exports = router