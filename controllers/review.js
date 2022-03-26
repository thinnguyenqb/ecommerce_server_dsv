const Review = require('../models/Review.model')
const Product = require('../models/Product.model')
const User = require('../models/User.model')
const { ObjectId } = require('bson');

const reviewController = {
  getList: async (req, res) => {
    try {
      const reviews = await Review.find();
      res.status(200).json(reviews);

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getItem: async (req, res) => {
    try {
      const review = await Review.findOne({ _id: req.params.id })
      res.status(200).json(review)
      
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

      const user = await User.findById(userId)
      const result = {
        ...review._doc,
        userName: user.name,
        userAvatar: user.avatar
      }

      res.status(200).json({
        msg: "Create review successful!",
        result
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

module.exports = reviewController;
