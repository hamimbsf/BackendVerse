const jwt = require("jsonwebtoken");

const identifyUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({
      message: "token not provided,unauthorized access",
    });
  }

  let decode = null;

  try {
    decode = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "user not authorized",
    });
  }

  req.user = decode;
  next();
};

module.exports = identifyUser;
