const Product = require('../models/Product.model')
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
      ]);
      
      res.status(200).json({ product: item[0] });
      } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      
      
      res.status(200).json("");
      } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = productController;
