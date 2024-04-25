
const config = require("./index.js");
const { username, password, database, host, client } = config.db;
module.exports = {
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
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    seederStorage: "sequelize",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};