const express = require("express");
const app = express();
const sequelize = require("./db");

const item = require("./controllers/item-controller");
const order = require("./controllers/order-controller");
const BusinessError = require("./errors/business-error");
const { ValidationError } = require("joi");

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
app.use("/api/items", item);
app.use("/api/orders", order);

app.all("*", (req, res) => res.status(404).end());
app.use((err, req, res, next) => {
  if (err instanceof BusinessError) {
    res.status(400).json({ error: err.description });
  } else if (err instanceof ValidationError) {
    res.status(400).json({ message: err.message });
  } else {
    res.status(500).end(err.stack);
  }
});

module.exports = app;
