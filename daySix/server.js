const app = require("./src/app");
const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose
    .connect(
      "mongodb+srv://hamimbsf:v91zfqhqF6AbNJIa@cluster0.47zo9fl.mongodb.net/daySix",
    )
    .then(() => {
      console.log("connected to db");
    });
};

connectToDb();
app.listen(3000, () => {
  console.log("server is running");
});
