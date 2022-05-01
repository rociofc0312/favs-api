const jwt = require("jsonwebtoken");
const User = require("./user.model");

async function getUserByEmail(email) {
  const user = (await User.findOne({ email })) || {};
  return user;
}

function signToken(payload) {
  const token = jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: "2h",
  });

  return token;
}

module.exports = {
  getUserByEmail,
  signToken,
};
