const mongoose = require("mongoose")

const subCategorySchema = new mongoose.Schema(
  {
    nameKindCategory: { type: String, required: true },
    subCategory: { type: Array, required: true },
  }
)

module.exports = mongoose.model("SubCategory", subCategorySchema)