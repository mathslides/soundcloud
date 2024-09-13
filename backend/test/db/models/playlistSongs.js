"use strict";
module.exports = (sequelize, DataTypes) => {
    const PlaylistSongs = sequelize.define(
        "PlaylistSongs",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            playlistId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Playlist",
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

    PlaylistSongs.associate = function (models) {
        PlaylistSongs.belongsTo(models.Playlist, {
            foreignKey: "playlistId",
        });
        PlaylistSongs.belongsTo(models.Song, {
            foreignKey: "songId",
        });

    };

    return PlaylistSongs;
};