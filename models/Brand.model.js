const mongoose = require("mongoose")

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    product: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
        default: []
    },
  }
)

module.exports = mongoose.model("Brand", brandSchema)