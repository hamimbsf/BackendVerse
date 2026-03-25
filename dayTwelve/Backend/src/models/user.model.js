const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "this username already exist"],
    required: [true, "username is required"],
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    unique: [true, "With this email user already exist"],
    required: [true, "email is required"],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  bio: String,
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/hamimbsf/l60Hf.png",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
