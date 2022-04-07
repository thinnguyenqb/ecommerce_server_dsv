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
    productStock: { type: Array, required: true },
    productColor: {
      type: Array,
      required: true,
      default: ["#ff5f6d", "#5f6dff", "#4d4d4d", "#ff7413", "#ecafd8", "#e2e2e2"]
    },
    productImageUrl: {
      type: Array, required: true,
      default:
        ["https://media.everlane.com/image/upload/c_fill,w_384,ar_1:1,q_auto,dpr_1.0,g_face:center,f_auto,fl_progressive:steep/i/6468c616_25c7",
        "https://media.everlane.com/image/upload/c_fill,w_384,ar_1:1,q_auto,dpr_1.0,g_face:center,f_auto,fl_progressive:steep/i/4af2b4e2_d910"]
    },
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
  },
  { timestamps: true }
)

productSchema.index({ first: 1, last: -1 }, { unique: true })

module.exports = mongoose.model("Product", productSchema)