const Product = require('../models/Product.model')
const Reviews = require('../models/Reviews.model')

const mongoDataMethods = {
  getAllProducts: async () => await Product.find(),
  getProductById: async (id) => await Product.findById(id)
}

module.exports = mongoDataMethods