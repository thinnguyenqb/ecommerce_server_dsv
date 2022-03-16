const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email"
      ]
    },
    isVerify: {
      type: Boolean,
      required: true,
    },
    role: {
      type: String,
      default: 'customer'
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)