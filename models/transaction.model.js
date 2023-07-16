const { Timestamp } = require("bson");
const { timeStamp } = require("console");
const mongoose = require("mongoose");
const transcationScema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    remarks: {
      type: String,
      required: [true, "Remarks is required"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User ID is required"],
    },
    transaction_type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Type is required!"],
    },
  },
  { timestamps: true }
);

const transactionModel = mongoose.model("transactions", transcationScema);

module.exports = transactionModel;
