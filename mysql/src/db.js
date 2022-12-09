const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(process.env.CONNECTION_STRING, { logging: false });
const sequelize = new Sequelize("order_db", "order", "password", {
  host: "mysql.nucleoid.com",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
