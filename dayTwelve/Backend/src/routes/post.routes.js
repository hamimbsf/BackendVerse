const express = require("express");
const postRouter = express.Router();
const {
  createPostController,
  getPostController,
  getPostDetailsController,
} = require("../controllers/post.controller");
const identifyUser = require("../middleware/auth.middleware");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  createPostController,
);
postRouter.get("/", identifyUser, getPostController);
postRouter.get("/details/:postId", identifyUser, getPostDetailsController);

module.exports = postRouter;
