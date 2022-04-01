const Users = require('../models/User.model');

const authSeller = async (req, res, next) => {
  try {
    // Get user information by id
    const user = await Users.findOne({
      _id: req.user.id,
    });
    if (user.role !== 'seller')
      return res
        .status(400)
        .json({ msg: 'Seller resources access denied' });
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authSeller;