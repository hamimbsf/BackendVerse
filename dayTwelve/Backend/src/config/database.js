const mongoose = require("mongoose");

const connectedToDb = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(console.log("Connected to Db"));
};

module.exports = connectedToDb;
