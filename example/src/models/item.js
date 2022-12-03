const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Item = sequelize.define("Item", {
  name: {
    type: DataTypes.STRING,
  },
  barcode: {
    type: DataTypes.STRING,
  },
});

module.exports = Item;
