const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: Schema.Types.ObjectId, required: true, },
    color: { type: String, required: true},
    size: { type: String, required: true},
    quatity: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  }, { timestamps: true }
);

module.exports = mongoose.model('OrderItem', orderItemSchema);
