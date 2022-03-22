const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
    categoryImage: { type: String, required: true },
    categoryKind: { type: Array, required: true },
  }
)

module.exports = mongoose.model("Category", categorySchema)