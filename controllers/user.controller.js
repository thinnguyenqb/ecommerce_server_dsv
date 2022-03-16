const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require("./sendMail");

const { CLIENT_URL } = process.env;

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password)
        return res
          .status(400)
          .json({ msg: 'Please fill in all fields.' });

      if (!validateEmail(email))
        return res.status(400).json({ msg: 'Invalid email.' });

      const user = await User.findOne({ email });
      if (user) {
        if(!user.isVerify) return res.status(400).json({ msg: "Please activate your email to start" });
        return res.status(400).json({ msg: "This email already exists." });
      }

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: 'Password must be at least 6 characters.' });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new User({
        name,
        email,
        password: passwordHash,
        isVerify: false
      });

      await newUser.save();
      const activation_token = createActivationToken({ email });
      const url = `${CLIENT_URL}/user/activate/${activation_token}`;
      sendMail(email, url, 'Verify your email address');

      res.json({
          msg: 'Register Success! Please activate your email to start',
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });

      const access_token = createAccessToken({ id: user._id});

      res.status(200).json({
        msg: "Login successful!",
        access_token: access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const { email } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );
      
      const user = await User.findOne({ email });
      console.log(user);
      if (user) {
        user.isVerify = true;
        await user.save();
        res.status(200).json({ msg: "Account has been activated!" });
      }
      else return res.status(400).json({ msg: "This email already exists." });
      
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });

      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const access_token = createAccessToken({ id: user._id });
      const url = `${CLIENT_URL}/user/reset/${access_token}`;

      sendMail(email, url, "Reset your password");
      res.json({ msg: "Re-send the password, please check your email." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
    
      const passwordHash = await bcrypt.hash(password, 12);
      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        }
      );

      res.json({ msg: "Password successfully changed!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserInfor: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.status(200).json({
          user: {
            ...user._doc,
          }
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d'
  })
}

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: '15m'
  })
}

function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = userController;
