const Product = require('../models/Product.model');
const Reviews = require('../models/Reviews.model');

const mongoDataMethods = {
  getAllProducts: async () => await Product.find(),
  getProducts: async ({ sub, kind, category, filterOptions }) => {
    console.log({ sub, kind, category, filterOptions });
  },
  getProductById: async (id) => await Product.findById(id),
};

module.exports = mongoDataMethods;
