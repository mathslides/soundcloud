const db = require("../db/models/index");
const { Song } = require("../db/models/index");

const { Op, Sequelize } = require("sequelize");

const getAllSongs = async (searchTerm) => {
  const whereClause = searchTerm
    ? { title: { [Op.like]: `%${searchTerm}%` } }
    : {};
  const allSongs = await db.Song.findAll({
    where: whereClause,
    limit: 15,
    order: [["createdAt", "DESC"]],
  });
  return allSongs;
};

const getTrendSongs = async () => {
  try {
    const trendSongs = await Song.findAll({
      // limit: 15,
      order: [["createdAt", "DESC"]],
      attributes: [
        "id",
        "title",
        "artist",
        "imgUrl",
        "youtubeLink",
        "tiktokLink",
        "facebookLink",
        "userId",
        "genre",

        [Sequelize.fn("count", Sequelize.col("audioFile")), "hasFile"],
      ],
      group: ["Song.id"],
    });
    return trendSongs;
  } catch (error) {
    console.error("Error fetching trend songs:", error);
    throw error;
  }
};

const getOneSong = async (id) => {
  const getOne = await Song.findByPk(id);
  return getOne;
};
async function getGenres() {
  try {
    const genres = await db.Genre.findAll();
    return genres;
  } catch (error) {
    throw error;
  }
}

const uploadFunction = async (body) => {
  try {
    const data = { ...body, album: body.albumName };
    const newSong = await Song.create(data);
    return newSong;
  } catch (error) {
    console.error("Error fetching songs:", error);
    throw error;
  }
};
const getAllAdminSongs = async () => {
  try {
    const allSongs = await Song.findAll({
      attributes: [
        "id",
        "title",
        "genre",
        "artist",
        "album",
        "userId",
        "createdAt",
      ],
    });
    return allSongs;
  } catch (error) {
    console.error("Error fetching songs:", error);
    throw error;
  }
};

const getOneAdminSong = async (id) => {
  const currentSong = await Song.findByPk(id);
  return currentSong;
};

const uploadFunctionAdmin = async (body) => {
  try {
    const data = { ...body, album: body.albumName };
    const newSong = await Song.create(data);

    return newSong;
  } catch (error) { }
};

// Delete a user by ID
const deleteSong = async (id) => {
  try {
    const song = await Song.findByPk(id);
    if (!song) {
      throw new Error("User not found");
    }
    await song.destroy();
    return { message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Could not delete user");
  }
};


const editSong = async (id, updatedData) => {
  try {
    const song = await Song.findByPk(id);
    if (!song) {
      throw new Error("Song not found");
    }
    await song.update(updatedData);
    return song;
  } catch (error) {
    console.error("Error updating song:", error);
    throw new Error("Could not update song");
  }
};

module.exports = {
  getAllSongs,
  getTrendSongs,
  getOneSong,
  uploadFunction,
  getAllAdminSongs,
  getOneAdminSong,
  uploadFunctionAdmin,
  getGenres,
  deleteSong,
  editSong
};
