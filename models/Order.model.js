const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: 'Customer',
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    orderItem: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }],
      default: [],
    },
    status: {
      type: String,
      enum: ['completed', 'pending', 'canceled'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Order', orderSchema);
