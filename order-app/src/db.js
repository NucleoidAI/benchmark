const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("order_db", "order", "password", {
  host: "mysql.nucleoid.com",
  dialect: "mysql",
  // host: "postgres.nucleoid.com",
  // dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
