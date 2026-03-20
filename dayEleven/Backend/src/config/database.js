const mongoose = require("mongoose");

const connectedToDb = () => {
  mongoose.connect(process.env.MONGO_URI).then(console.log("Connected to Db"));
};

module.exports = connectedToDb;
