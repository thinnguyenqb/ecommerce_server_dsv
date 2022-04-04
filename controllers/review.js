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
  getListItem: async (req, res) => {
    try {
      const dataResult = []
      const productId = req.params.id
      const reviews = await Review.find()
      for (let i = 0; i < reviews.length; i++){
        if ((reviews[i].productId) == productId) {
          dataResult.push(reviews[i])
        }
      }
      res.status(200).json(dataResult)
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  create: async (req, res) => {
    try {
      const { productId, userId, title, comment, star } = req.body;
      const review = await Review.create({
        userId: new ObjectId(userId),
        productId: new ObjectId(productId),
        title,
        comment,
        star
      })
      
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
