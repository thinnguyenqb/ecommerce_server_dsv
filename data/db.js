const Product = require('../models/Product.model');
const Reviews = require('../models/Review.model');

const mongoDataMethods = {
  getAllProducts: async () => {
    const res = await Product.find()
    console.log(res[0].productStock)
    return res
  },
  getProductById: async (id) => await Product.findById(id)
  // getProducts: async ({ sub, kind, category, filterOptions }) => {
  //   console.log({ sub, kind, category, filterOptions });
  // },
};

module.exports = mongoDataMethods;
