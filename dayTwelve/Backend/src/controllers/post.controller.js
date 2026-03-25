const postModel = require("../models/post.model");

const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const createPostController = async (req, res) => {
  const { caption } = req.body;
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({
      message: "token not provided,unauthorized access",
    });
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  // return console.log(decode);

  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
  });

  const post = await postModel.create({
    caption: caption,
    imgUrl: file.url,
    user: decode.id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
};

module.exports = {
  createPostController,
};
