'use strict';

module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define(
    'Genre',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {}
  );

  Genre.associate = function (models) {
    // Associations can be defined here
    // Example associations:
    // Genre.belongsToMany(models.Artist, { through: 'ArtistGenre', foreignKey: 'genreId' });
    // Genre.hasMany(models.Song, { foreignKey: 'genreId' });
  };

  return Genre;
};
