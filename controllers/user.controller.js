const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { CLIENT_URL } = process.env;

const userController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            //console.log({name, email, password});

            if (!name || !email || !password)
                return res
                    .status(400)
                    .json({ msg: 'Please fill in all fields.' });

            if (!validateEmail(email))
                return res.status(400).json({ msg: 'Invalid email.' });

            const user = await User.findOne({ email });
            if (user)
                return res
                    .status(400)
                    .json({ msg: 'This email already exists.' });

            if (password.length < 6)
                return res
                    .status(400)
                    .json({ msg: 'Password must be at least 6 characters.' });

            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = {
                name,
                email,
                password: passwordHash,
            };

            const activation_token = createActivationToken(newUser);
            //const url = `${CLIENT_URL}/user/activate/${activation_token}`;
            //sendMail(email, url, 'Verify your email address');

            //console.log(newUser)

            res.json({
                msg: 'Register Success! Please activate your email to start',
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = userController;
