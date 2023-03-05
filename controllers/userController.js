const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send('Email and password are required');
    }
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send('username or password is invalid');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Incorrect username or password');
    }
    const token=jwt.sign({username:user.username},"some secret")
    res.status(200).send({ user: user,success: true,token });
  } catch (error) {
    res.status(500).send("Unknown server error");
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser)
    return res.status(400)
    .send('User with this username already exists');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({username, password: hashedPassword });
    await user.save();
    res.status(201).send("Customer successfully registered, now you can login");
  } catch (error) {
    res.status(500).send("Unknown server error");
  }
};

