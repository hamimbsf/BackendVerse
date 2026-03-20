require("dotenv").config();
const app = require("./src/app");
const connectedToDb = require("./src/config/database");

connectedToDb();
app.listen(3000, () => {
  console.log(3000, "Server is running....");
});
