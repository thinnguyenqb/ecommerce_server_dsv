const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, },
    productId: { type: Schema.Types.ObjectId },
    title: { type: String, required: true, },
    comment: { type: String, required: true, },
    rating: { type: Number, required: true, },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Review", reviewSchema)