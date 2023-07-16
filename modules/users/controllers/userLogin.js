const mongoose = require("mongoose");
const bcrpt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  const users = mongoose.model("users");
  const { email, password } = req.body;
  console.log(req.body);
  //Validation...

  //creation logic...
  try {
    if (!email) throw "Please provide your email";
    if (!password) throw "Please provide your password";
    const getUser = await users.findOne({
      email: email,
    });
    if (!getUser) throw "User doesnot exists...";
    const matched = await bcrpt.compare(password, getUser.password);
    if (!matched) throw "Password is incorrect..";
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e,
    });
    return;
  }
  //alll is good
  const getUserForAccessToken = await users.findOne({
    email: email,
  });

  const accessToken = jwt.sign(
    {
      _id: getUserForAccessToken._id,
      name: getUserForAccessToken.name,
      email: getUserForAccessToken.email,
    },
    process.env.jwt_salt,
    {
      expiresIn: "20 days",
    }
  );
  res.status(200).json({
    status: "Login Successfully...",
    accessToken,
  });
};

module.exports = userLogin;
