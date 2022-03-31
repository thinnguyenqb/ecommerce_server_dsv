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
    productColor: {
      type: Array,
      required: true,
      default: ["#ff5f6d", "#5f6dff", "#4d4d4d", "#ff7413", "#ecafd8", "#e2e2e2"]
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
      required: true,
      default: 0
    },
    soldQuantity: {
      type: Number,
      default: 0
    },
    review: {
      type: [{ type: mongoose.Schema.Types.Object, ref: "Review" }],
      default: []
  },
  },
  { timestamps: true }
)

productSchema.index({ first: 1, last: -1 }, { unique: true })

module.exports = mongoose.model("Product", productSchema)