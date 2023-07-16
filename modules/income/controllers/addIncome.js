const mongoose = require("mongoose");

const addIncome = async (req, res) => {
  const user = mongoose.model("users");
  const transaction = mongoose.model("transactions");
  const { amount, remarks } = req.body;
  try {
    if (!amount) throw "Please enter amount!";
    if (amount < 1) throw "Amount must be more than 1";
    if (!remarks) throw "Remarks is required!";
    if (remarks.length < 3) throw "Remarks length must be more than 2";
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e,
    });
    return;
  }

  //success
  try {
    await transaction.create({
      amount: amount,
      remarks: remarks,
      user_id: req.user._id,
      transaction_type: "income",
    });

    await user.updateOne(
      {
        _id: req.user._id,
      },
      {
        $inc: {
          balance: amount,
        },
      },
      { runValidators: true }
    );
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
    return;
  }
  res.status(200).json({
    status: "Your income has been added successfully...",
  });
};

module.exports = addIncome;
