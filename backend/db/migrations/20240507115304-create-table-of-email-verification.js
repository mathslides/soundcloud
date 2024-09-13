// 
"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("EmailVerifications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(256),
        unique: true,
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      deletedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      expiredAt: {
        allowNull: true, // Change allowNull to true
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("EmailVerifications");
  },
};
