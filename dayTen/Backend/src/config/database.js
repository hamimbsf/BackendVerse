const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose.connect(process.env.MONGO_URI).then(console.log("connected to Db"));
};

module.exports = connectToDb;
