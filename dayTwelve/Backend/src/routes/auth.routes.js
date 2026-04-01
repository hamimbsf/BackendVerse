const express = require("express");
const {
  loginController,
  registerController,
  getMeController,
} = require("../controllers/auth.controller");
const identifyUser = require("../middleware/auth.middleware");

/* middleware */
const authRouter = express.Router();

/* register */
authRouter.post("/register", registerController);

/* login */
authRouter.post("/login", loginController);

/* get-me */
authRouter.get("/get-me", identifyUser, getMeController);

module.exports = authRouter;
