const userModel = require("../models/user.model");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { username, email, password, profileImage, bio } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message:
        "user already exist" +
        (isUserAlreadyExist.email === email
          ? "Email already exist"
          : "Username already exist"),
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    profileImage,
    bio,
    password: hash,
  });
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
  res.cookie("token", token);

  res.status(201).json({
    message: "User register successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
};

const loginController = async (req, res) => {
  const { username, password, email } = req.body;

  const user = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (!user) {
    return res.status(401).json({
      message: "User not found",
    });
  }

  const isPasswordValid = bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);
  res.status(200).json({
    message: "User login successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
};

const getMeController = async (req, res) => {
  const userId = req.user.id;

  const user = await userModel.findById(userId);

  res.status(200).json({
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
};
module.exports = {
  registerController,
  loginController,
  getMeController,
};
