const Order = require('../models/Order.model')
const OrderItem = require('../models/OrderItem.model')
const Product = require('../models/Product.model')
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const orderController = {
  getList: async (req, res) => {
    try {
      const orders = await Order.find();
      const orderItems = await OrderItem.find()
      const data = [];
      
      for (let i = 0; i < orders.length; i++){
        const orderItemList = [];
        for (let j = 0; j < orderItems.length; j++){
          if (orders[i]._id.toString() === orderItems[j].orderId.toString()) {
            const product = await Product.findById(orderItems[j].productId.toString())
             orderItemList.push({
              ...orderItems[j]._doc,
              productName: product.productName
            })
          }
  
        }
        data.push({
          ...orders[i]._doc,
          orderItemList: orderItemList
        })
      }
      
      res.status(200).json(data);

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getItem: async (req, res) => {
    try {
      const order = await Order.findOne({ _id: req.params.id })
      res.status(200).json(order)
      
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  create: async (req, res) => {
    try {
      const { listProduct, totalPrice } = req.body;
      console.log(listProduct)
      // const order = await Order.create({
      //   userId: new ObjectId(req.user.id),
      //   totalPrice: totalPrice
      // })

      // listProduct.forEach(element => {
      //   OrderItem.create({
      //     productId: new ObjectId(element.productId),
      //     orderId: order._id,
      //     color: element.colorOption,
      //     size: element.sizeOption,
      //     quantity: element.quantity,
      //     total: element.itemTotal
      //   })
      // })

      res.status(200).json({
        msg: "Order Successfully Placed",
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  update: async (req, res) => {
    try {
      res.json("")
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      res.json("")
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = orderController;
