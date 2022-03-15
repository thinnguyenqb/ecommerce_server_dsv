const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
  {
    nameProduct: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Object,
      required: true,
    },
    imgProduct: {
      type: Array,
      required: true,
    },
    descProduct: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Product", productSchema)