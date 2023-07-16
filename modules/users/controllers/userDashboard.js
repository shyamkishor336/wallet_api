const mongoose = require("mongoose");

const userDashboard = async (req, res) => {
  const user = mongoose.model("users");
  const transaction = mongoose.model("transactions");
  const getUserData = await user
    .findOne({
      _id: req.user._id,
    })
    .select("balance email name");
  // console.log(req.user);
  const getTransaction = await transaction
    .find({ user_id: req.user._id })
    .sort("-createdAt")
    .select("remarks amount transaction_type")
    .limit(5);

  res.status(200).json({
    data: getUserData,
    transaction: getTransaction,
  });
};

module.exports = userDashboard;
