const mongoose = require("mongoose");
const bcrpt = require("bcrypt");

const userRegister = async (req, res) => {
  const users = mongoose.model("users");
  const { name, email, password, address, balance } = req.body;
  console.log(req.body);
  const ePassword = await bcrpt.hash(password, 10);
  //Validation...

  //creation logic...
  try {
    await users.create({
      name,
      email,
      password: ePassword,
      address,
      balance,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
    return;
  }

  res.status(200).json({
    message:
      "Congratulations!, Your account has been registered successsfully..",
  });
};

module.exports = userRegister;
