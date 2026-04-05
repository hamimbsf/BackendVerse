const express = require("express");
const postRouter = express.Router();
const {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
  getfeedController,
} = require("../controllers/post.controller");
const identifyUser = require("../middleware/auth.middleware");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

/*  */
postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  createPostController,
);

/*  */
postRouter.get("/", identifyUser, getPostController);

/*  */
postRouter.get("/details/:postId", identifyUser, getPostDetailsController);

/**
 * like a post
 * */

postRouter.post("/like/:postId", identifyUser, likePostController);

/* get feed */

postRouter.get("/feed", identifyUser, getfeedController);

module.exports = postRouter;
