const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productCategory: { type: String, required: true },
    productKindCategory: { type: String, required: true },
    productSubCategory: { type: Array, required: true },
    productBrand: { type: String, required: true},
    productPrice: { type: Number, required: true },
    productStock: {
      S: Number,
      M: Number,
      L: Number
    },
    productImageUrl: { type: Array, required: true },
    productDescription: { type: String, required: true },
    rate: {type: Number, default: 1 },
    status: {
      type: String,
      enum: ['In-store', 'Out of stock'],
      default: 'In-store'
    },
    quantity: {
      type: Number,
      required: true
    },
    soldQuantity: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Product", productSchema)