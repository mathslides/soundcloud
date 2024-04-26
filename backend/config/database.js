
const config = require("./index.js");
const { username, password, database, host, client } = config.db;

const databaseConfig = {
  development: {
    username,
    password,
    database,
    host,
    client,
    dialect: "postgres",
    seederStorage: "sequelize",
  },
  production: {
    username,
    password,
    database,
    host,
    client,
    dialect: "postgres",
    seederStorage: "sequelize",
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  },
}
module.exports = databaseConfig;