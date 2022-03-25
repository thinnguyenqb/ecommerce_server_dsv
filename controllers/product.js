const Product = require('../models/Product.model')
const User = require('../models/User.model')
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;

const productController = {
  getList: async (req, res) => {
    try {
      const list = await Product.find();
      
      res.status(200).json({ products: list });
      
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getItem: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Product.aggregate([
        {
          $match: { _id: ObjectId(id) }
        },
        {
          $lookup:
          {
            from: "reviews",
            localField: "review",
            foreignField: "_id",
            as: "review",
          }
        },
      ]);

      const reviewUser = [];
      for (let i = 0; i < item[0].review.length; i++){
        const res = await User.findById(item[0].review[i].userId)
        reviewUser.push({
          ...item[0].review[i],
          userName: res.name,
          userAvatar: res.avatar,
        })
      }
      const resultData = {
        ...item[0],
        review: reviewUser
      }
      res.status(200).json({ product: resultData });
      } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  create: async (req, res) => {
    try {
      
      
      res.status(200).json("");
      } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const { products } = req.body;
      
      res.json({ products });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
},
};

module.exports = productController;
