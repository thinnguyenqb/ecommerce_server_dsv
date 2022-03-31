const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new mongoose.Schema({
    productId: { type: Schema.Types.ObjectId, required: true, },
    orderId: { type: Schema.Types.ObjectId, required: true, },
    color: { type: String, required: true},
    size: { type: String, required: true},
    quantity: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    }
  }, {
    collection: 'orderItems'
  }
);

module.exports = mongoose.model('OrderItem', orderItemSchema);


// {
//   id: '25064a3-0c5d-a6fe-1d5d-04ee84da14e',
//   productId: '623acf20c8fc25006c23698e',
//   sizeOption: 'M',
//   pieceAvailable: 20,
//   colorOption: '#4d4d4d',
//   price: 40,
//   productImg: 'https://res.cloudinary.com/ericnguyen-cop/image/upload/v1648021354/Ecommerce/eb9aqly8smpc7jkjozrd.jpg',
//   productName: 'The Felted Merino Hoodie',
//   quantity: 2,
//   itemTotal: 80
// }