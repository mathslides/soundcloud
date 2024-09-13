'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const LoginToken = sequelize.define('LoginToken', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // This should match the table name of the referenced model
        key: 'id',      // This should match the column name of the referenced key
      },
      onUpdate: 'CASCADE', // Optional: Define what happens on update
      onDelete: 'CASCADE', // Optional: Define what happens on delete
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expiredAt: {
      type: DataTypes.DATE,
    },
    createdAt: {
      type: DataTypes.DATE,
      // allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  }, {
    // Additional options
    tableName: 'LoginTokens', // Optional: Specify the table name if different from model name
  });

  LoginToken.associate = function (models) {
    // associations can be defined here
    LoginToken.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };
  return LoginToken;
};
