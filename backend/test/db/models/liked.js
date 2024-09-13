"use strict";
module.exports = (sequelize, DataTypes) => {
  const Liked = sequelize.define(
    "Liked",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      songId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Songs",
          key: "id",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
  );

  Liked.associate = function (models) {
    // associations can be defined here
    Liked.belongsTo(models.User, {
      foreignKey: "userId",
    });
    Liked.belongsTo(models.Song, {
      foreignKey: "songId",
    });
  };

  return Liked;
};