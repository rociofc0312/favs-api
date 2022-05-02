require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("./user.model");
const { signToken } = require("./user.service");

async function createUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).json("All input are required");
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      res.status(409).json("User Already Exist. Please Login");
    }
    const user = await User.create({ email, password });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).json("All input are required");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = signToken({ user_id: user._id, email, role: user.role });
      user.token = token;

      res.status(200).json({ token: user.token });
    } else {
      res.status(401).json({ error: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  createUser,
  loginUser,
};
