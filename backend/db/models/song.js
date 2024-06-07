"use strict";
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define(
    "Song",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      audioFile: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imgUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      artist: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      album: {
        type: DataTypes.STRING,
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
    },
  );
  Song.associate = function (models) {
    // associations can be defined here
    Song.hasMany(models.Comment, { foreignKey: "songId" });
    Song.hasMany(models.Liked, { foreignKey: "songId" });
    Song.hasMany(models.PlaylistSongs, { foreignKey: "songId" });
    Song.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };

  Song.getCurrentSongById = async function (id) {
    return await Song.scope("currentSong").findByPk(id);
  };

  return Song;
};
