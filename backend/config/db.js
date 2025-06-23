const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "12220920Chizu!",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
    logging: false,
  }
);

module.exports = sequelize;
