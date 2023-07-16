const express = require("express");
const auth = require("../../middlewares/auth");
const addExpense = require("./controllers/addExpense");

const expenseRouter = express.Router();

//Protected routes...
expenseRouter.use(auth);
expenseRouter.post("/add", addExpense);

module.exports = expenseRouter;
