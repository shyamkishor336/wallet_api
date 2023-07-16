const express = require("express");
const auth = require("../../middlewares/auth");
const addIncome = require("./controllers/addIncome");

const incomeRouter = express.Router();

//Protected routes...
incomeRouter.use(auth);
incomeRouter.post("/add", addIncome);

// userRouter.get("/dashboard", userDashboard);

module.exports = incomeRouter;
