// const config = require("./index");

// const db = config.db;
// console.log("db----", db);
// const username = db.username;
// const password = db.password;
// const database = db.database;
// const client = db.client;
// const host = db.host;

// module.exports = {
//   development: {
//     username,
//     password,
//     database,
//     host,
//     client,
//     dialect: "postgres",
//     seederStorage: "sequelize",
//   },
//   production: {
//     use_env_variable: "DATABASE_URL",
//     dialect: "postgres",
//     seederStorage: "sequelize",
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   },
// };
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