const { Sequelize } = require("sequelize");
const config = require("./config");

const sequelizePostgres = new Sequelize(config.database.url, {
  dialect: "postgres",
  logging: false,
});

const sequelizeSqlite = new Sequelize('task_management', 'sagar', 'password123', {
  host: 'localhost',
  dialect: 'sqlite', // or 'sqlite', 'postgres', 'mssql'
  logging: false, // Disable logging; default: console.log
  storage: './sqlite/database.sqlite', // SQLite only
  dialectOptions: {
    // SQLite only
    useUTC: false, // Prevents the date from being converted to UTC
  },
});

module.exports = {sequelize:sequelizeSqlite};
