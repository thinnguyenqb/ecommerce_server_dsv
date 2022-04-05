const Product = require('../models/Product.model');
const Reviews = require('../models/Review.model');
const Orders = require('../models/Order.model');
const OrderItem = require('../models/OrderItem.model');

const mongoDataMethods = {
  getAllProducts: async () => {
    const res = await Product.find()
    console.log(res[0].productStock)
    return res
  },
  getProductById: async (id) => await Product.findById(id),
  getProducts: async (data) => {
    const { page, perPage, sort, order, search } = data.input;
    console.log({ page, perPage, sort, order, search })
    const sortName = sort ?? "productName";
    const orderData = order ?? "ASC";
    const startRange = page ?? 1;
    const limitRange = perPage ?? 10;
    const nameProduct = search ?? '';

    let query = {"productName": { '$regex': nameProduct }};
    const productList = await Product
      .find(query)
      .sort([[sortName, orderData]])
      .limit(limitRange)
      .skip((startRange-1)*limitRange)
    
    const totalPage = await Product.countDocuments(query);
    console.log((productList))
    // console.log((productList[1].productStock))
    return productList
  },
  getOrders: async () => {
    const res = await Orders.aggregate([
      {
        $lookup:
        {
          from: "orderItems",
          localField: "_id",
          foreignField: "orderId",
          as: "orderItems"
        }
      }
    ])
    console.log(res)
    return res
  },
};

module.exports = mongoDataMethods;
