const { Sequelize } = require("sequelize");
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_USER = process.env.DB_USER;
const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;
const sequelizeDB = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-8", // 设置时区为中国时区
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: process.env.NODE_ENV === "development" ? console.log : false,
});
// sequelizeDB.sync({ alter: true });
module.exports = sequelizeDB;
