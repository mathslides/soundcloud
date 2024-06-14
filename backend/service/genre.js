const db = require('../db/models');

async function createGenre(genreData) {
  try {
    console.log("genreData", genreData);
    const genre = await db.Genre.create(genreData);
    return genre;
  } catch (error) {
    throw error;
  }
}

async function getGenres() {
  try {
    const genres = await db.Genre.findAll();
    return genres;
  } catch (error) {
    throw error;
  }
}

async function deleteGenre(genreId) {
  try {
    const genre = await db.Genre.findByPk(genreId);
    if (!genre) {
      throw new Error('Genre not found');
    }

    await genre.destroy();
    return { message: 'Genre deleted successfully' };
  } catch (error) {
    throw error;
  }
}

async function updateGenre(genreId, updatedFields) {
  try {
    const genre = await db.Genre.findByPk(genreId);
    if (!genre) {
      throw new Error('Genre not found');
    }

    await genre.update(updatedFields);
    return genre;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createGenre,
  getGenres,
  deleteGenre,
  updateGenre,
};
