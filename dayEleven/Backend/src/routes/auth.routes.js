const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userModel = require("../models/user.model");

const authRouter = express.Router();

/* reguster */
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadExist = await userModel.findOne({ email });
  if (isUserAlreadExist) {
    return res.status(409).json({
      message: "with this email user already exist",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");
  const user = await userModel.create({
    name,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: email,
    },
    process.env.JWT_SECRETS,
  );

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "User created successfully",
    user,
    token,
  });
});

/* login */
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "With this email user doesn't exist",
    });
  }

  const isPasswordMatch =
    user.password === crypto.createHash("md5").update(password).digest("hex");
  if (!isPasswordMatch) {
    return res.status(401).json({
      message: "password doesn't match",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRETS,
  );

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "login successfully",
    user,
    token,
  });
});

module.exports = authRouter;
