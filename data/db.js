const Product = require('../models/Product.model');
const Reviews = require('../models/Review.model');
const Orders = require('../models/Order.model');
const OrderItem = require('../models/OrderItem.model');
const User = require('../models/User.model');
const sendMailOrder = require("../controllers/sendMailOrder");


const mongoDataMethods = {
  getAllProducts: async () => {
    const res = await Product.find()
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
    // console.log((productList[1].productStock))
    return productList
  },
  getOrders: async () => {
    const orderList = await Orders.aggregate([
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

    const data = []
    for (let i = 0; i < orderList.length; i++){
      const orderItemList = [];
      for (let j = 0; j < orderList[i].orderItems.length; j++){
        const product = await Product.findById(orderList[i].orderItems[j].productId.toString())
        orderItemList.push({
          ...orderList[i].orderItems[j],
          productName: product.productName
        })
      }
      data.push({
        ...orderList[i],
        orderItems: orderItemList
      })
    }
    return data
  },
  updateOrder: async (data) => {
    const { status, orderId } = data.input;
    const order = await Orders.findById(orderId)
    order.status = status
    await order.save()

    const user = await User.findById(order.userId)
    if (status === 'completed') {
      sendMailOrder(user, order, "Your order is successful!");
    }else if(status === 'canceled'){
      sendMailOrder(user, order, "Order canceled!");
    }
    
    const orderList = await Orders.aggregate([
      {
        $lookup:
        {
          from: "orderItems",
          localField: "_id",
          foreignField: "orderId",
          as: "orderItems"
        }
      },
    ])

    const dataResult = []
    for (let i = 0; i < orderList.length; i++){
      const orderItemList = [];
      for (let j = 0; j < orderList[i].orderItems.length; j++){
        const product = await Product.findById(orderList[i].orderItems[j].productId.toString())
        orderItemList.push({
          ...orderList[i].orderItems[j],
          productName: product.productName
        })
      }
      dataResult.push({
        ...orderList[i],
        orderItems: orderItemList
      })
    }
    return dataResult
  },
};

module.exports = mongoDataMethods;
