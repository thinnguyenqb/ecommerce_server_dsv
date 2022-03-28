const Product = require('../models/Product.model')
const User = require('../models/User.model')
const mongoose = require("mongoose");
const { isLeafType } = require('graphql');
const ObjectId = mongoose.Types.ObjectId;

const productController = {
  getList: async (req, res) => {
    try {
      const list = await Product.find();
      
      res.status(200).json({ products: productList });
      
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  productFilter: async (req, res) => {
    try {
      //console.log(req.body)
      // http://localhost:3001/product?category=men&kind=tops&sub=T-Shirts&order=ASC&page=1&perPage=10&sort=name
      // "sub": "",
      // "page": "",
      // "perPage": "",
      // "sort": "",
      // "order": "",
      // "size": "",
      // "price": "",
      // "perPrize": "",
      // "search": ""
      
      const { category, kind, sub, page, perPage, sort, order, size, price, perPrice, search } = req.body
      console.log({ category, kind, sub, page, perPage, sort, order, size, price, perPrice, search })

      const categoryFilter = category ?? '';
      const kindFilter = kind ?? '';
      const subFilter = sub ?? '';
      const startRange = page ?? 0;
      const limitRange = perPage ?? 7;
      const sortName = sort ?? "productName";
      const orderData = order ?? "ASC";
      const startPrice = price ?? 0;
      const endPrice = perPrice ?? 1000;
      const nameProduct = search ?? '';
      const sizeData = size ?? "S";

      //console.log(startRange, endRange)
      if (subFilter === '') {
        const productList = await Product
          .find({
            "productName": { '$regex': nameProduct },
            "productCategory": categoryFilter,
            "productKindCategory": kindFilter,
            "productPrice": { "$gte": startPrice, "$lte": endPrice }
          })
          .sort([[sortName, orderData]])
          .limit(limitRange - startRange + 1)
          .skip(Number(startRange))
        
          res.status(200).json({ products: productList });
      }
      if (subFilter !== '') {
        const productList = await Product
        .find({
          "productName": { '$regex': nameProduct },
          "productCategory": categoryFilter,
          "productKindCategory": kindFilter,
          "productSubCategory": {"$in" : [subFilter]},
          "productPrice": { "$gte": startPrice, "$lte": endPrice }
        })
        .sort([[sortName, orderData]])
        .limit(limitRange - startRange + 1)
        .skip(Number(startRange))
        
        res.status(200).json({ products: productList });
      }

      // "productStock": {"$elemMatch": {'size': sizeData}},
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
