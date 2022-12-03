const express = require("express");
const app = express();
const sequelize = require("./db");

const index = require("./routes/index");
const item = require("./routes/item");
const order = require("./routes/order");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

(async () => {
  await sequelize.sync();
  // Code here
})();

app.use(express.json());
app.use("/", index);
app.use("/items", item);
app.use("/orders", order);

module.exports = app;
