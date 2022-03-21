const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    isVerify: { type: Boolean, required: true },
    role: { type: String, default: 'customer' },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/ericnguyen-cop/image/upload/v1642046858/Classroom/fkwfz8i072rrbu3im9ol.png",
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
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)