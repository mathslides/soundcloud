const { Song } = require("../db/models/index");

const getAllSongs = async () => {
	const allSongs = await Song.findAll();
	return allSongs;
};

// const getTrendSongs = async () => {
// 	const trendSongs = await Song.findAll({ limit: 15 });
// 	return trendSongs;
// };
const getTrendSongs = async () => {
	try {
	  const trendSongs = await Song.findAll({
		limit: 15,
		order: [['createdAt', 'DESC']],
	  });
	  return trendSongs;
	} catch (error) {
	  console.error("Error fetching trend songs:", error);
	  throw error;
	}
  };
  
const getOneSong = async (id) => {
	const currentSong = await Song.findByPk(id);
	return currentSong;
};

const uploadFunction = async (body) => {
	try {
		const data = { ...body, album: body.albumName }
		const newSong = await Song.create(data);
		console.log("newSong --------", newSong);
		return newSong
	} catch (error) {
		console.error("Error fetching songs:", error);
		throw error;
	}
};
const getAllAdminSongs = async () => {
	try {
	  const allSongs = await Song.findAll({
		attributes: ['id', 'title', 'genre', 'artist', 'album', 'userId', 'createdAt'],
	  });
	  console.log("allSongs---------", allSongs);
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
		const data = { ...body, album: body.albumName }
		const newSong = await Song.create(data);
		console.log("newSong --------admin", newSong);

		return newSong
	} catch (error) {

	}
};

module.exports = {
	getAllSongs,
	getTrendSongs,
	getOneSong,
	uploadFunction,
	getAllAdminSongs,
	getOneAdminSong,
	uploadFunctionAdmin
};