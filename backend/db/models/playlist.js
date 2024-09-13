"use strict";
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define(
    "Playlist",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,

      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
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

  Playlist.associate = function (models) {
    Playlist.belongsTo(models.User, {
      foreignKey: "userId",
    });
    Playlist.hasMany(models.PlaylistSongs, {
      foreignKey: "playlistId",
    });

  };

  return Playlist;
};