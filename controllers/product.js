const Product = require('../models/Product.model')
const User = require('../models/User.model')
const mongoose = require("mongoose");
const { isLeafType } = require('graphql');
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
  productFilter: async (req, res) => {
    try {
      const { category, kind, sub, page, perPage, sort, order, size, price, perPrice, search } = req.body
      //console.log({ category, kind, sub, page, perPage, sort, order, size, price, perPrice, search })

      const categoryFilter = category ?? '';
      const kindFilter = kind ?? '';
      const subFilter = sub ?? '';
      const startRange = page ?? 1;
      const limitRange = perPage ?? 10;
      const sortName = sort ?? "productPrice";
      const orderData = order ?? "ASC";
      const startPrice = price ?? 0;
      const endPrice = perPrice ?? 1000;
      const nameProduct = search ?? '';
      const sizeData = size ?? "S";
      
      if (categoryFilter === '' && kindFilter === '') {
        let query = {"productName": { '$regex': nameProduct }};
        const productList = await Product
          .find(query)
          .sort([[sortName, orderData]])
          .limit(limitRange)
          .skip((startRange-1)*limitRange)
        
        const totalPage = await Product.countDocuments(query);

        res.status(200).json({
          products: productList,
          totalPage,
        });
      }
      let query = {
        "productName": { '$regex': nameProduct },
        "productCategory": categoryFilter,
        "productKindCategory": kindFilter,
        "productPrice": { "$gte": startPrice, "$lte": endPrice }
      };


      if (subFilter !== '') {
        query = {
          ...query,
          "productSubCategory": {"$in" : [subFilter]},
        };
      }

      const productList = await Product
          .find(query)
          .sort([[sortName, orderData]])
          .limit(limitRange)
          .skip((startRange-1)*limitRange)
        
        const totalPage = await Product.countDocuments(query);

        res.status(200).json({
          products: productList,
          totalPage,
        });
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
      console.log(item[0].review.length)
      // for (let i = 0; i < item[0].review.length; i++){
      //   const res = await User.findById(item[0].review[i].userId)
      //   reviewUser.push({
      //     ...item[0].review[i],
      //     userName: res.name,
      //     userAvatar: res.avatar,
      //   })
      // }
      const resultData = {
        ...item[0],
        review: reviewUser
      }

      //console.log(resultData)
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
