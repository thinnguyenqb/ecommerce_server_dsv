const Order = require('../models/Order.model')

const orderController = {
  getList: async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);

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
      const { productId, userId, title, comment, star } = req.body;

      const review = await Review.create({
        userId: new ObjectId(userId),
        title,
        comment,
        star
      })
      
      const product = await Product.findById(productId)
      product.review.push(review._id)
      product.save()

      res.status(200).json({
        msg: "Create review successful!",
        review
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
