const Products = require('../models/Product.model')
const Reviews = require('../models/Reviews.model')

const mongoDataMethods = {
	getAllProducts: async () => await Products.find()
}

module.exports = mongoDataMethods