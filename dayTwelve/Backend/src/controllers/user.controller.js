const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

const followUserController = async (req, res) => {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isFolloweeExist = await userModel.findOne({
    username: followeeUsername,
  });

  // console.log(isFolloweeExist);

  if (!isFolloweeExist) {
    return res.status(400).json({
      message: "User you are trying to follow does not exist",
    });
  }

  if (followeeUsername == followerUsername) {
    return res.status(400).json({
      message: "You can't follow yourself",
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    followee: followeeUsername,
    follower: followerUsername,
  });

  if (isAlreadyFollowing) {
    return res.status(200).json({
      message: `you are already following this user ${followeeUsername}`,
      follow: isAlreadyFollowing,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(201).json({
    message: `You are following ${followeeUsername}`,
    follow: followRecord,
  });
};

const unfollowUserController = async (req, res) => {
  const followerUsername = req.user.username; // YOU
  const followeeUsername = req.params.username; // TARGET USER

  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "Invalid action",
    });
  }
  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isUserFollowing) {
    return res.status(200).json({
      message: `You are not following ${followeeUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);

  res.status(200).json({
    message: `You have unfollowed ${followeeUsername}`,
  });
};
module.exports = { followUserController, unfollowUserController };
