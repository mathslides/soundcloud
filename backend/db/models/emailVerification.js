"use strict";
module.exports = (sequelize, DataTypes) => {
  const EmailVerification = sequelize.define(
    "EmailVerification",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true, 
        defaultValue: null, 
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      expiredAt: {
        type: DataTypes.DATE, 
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
  );

  return EmailVerification;
};
