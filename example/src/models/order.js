const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Item = require("./item");

const Order = sequelize.define("Order", {
  qty: {
    type: DataTypes.INTEGER,
  },
});

Order.belongsTo(Item);

module.exports = Order;
