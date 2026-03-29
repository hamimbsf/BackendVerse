const express = require("express");
const {
  followUserController,
  unfollowUserController,
} = require("../controllers/user.controller");
const identifyUser = require("../middleware/auth.middleware");

const userRouter = express.Router();

/*
 * @route POST /api/users/follow/:username
 * @description Follow an user
 * @access Private
 */
userRouter.post("/follow/:username", identifyUser, followUserController);

/*
 * @route POST /api/users/unfollow/:username
 * @description Unfollow an user
 * @access Private
 */
userRouter.post("/unfollow/:username", identifyUser, unfollowUserController);

module.exports = userRouter;
