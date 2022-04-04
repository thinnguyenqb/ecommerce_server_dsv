const router = require('express').Router();
const reviewController = require('../controllers/review');
const auth = require('../middleware/auth');

router.get('/', reviewController.getList)

router.get('/:id', reviewController.getListItem)

router.post('/', auth, reviewController.create)

router.put('/:id', auth, reviewController.update)

router.delete('/:id', auth, reviewController.delete)

module.exports = router