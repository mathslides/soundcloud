const db = require("../db/models/index");
const { Song } = require("../db/models/index");


const { Op } = require('sequelize');

const getAllSongs = async (searchTerm) => {

	const whereClause = searchTerm
		? { title: { [Op.like]: `%${searchTerm}%` } }
		: {};
	const allSongs = await db.Song.findAll({
		where: whereClause,
		limit: 15,
		order: [['createdAt', 'DESC']],
	});
	return allSongs;
};

async function getGenres() {
	try {
	  const genres = await db.Genre.findAll();
	  return genres;
	} catch (error) {
	  throw error;
	}
  }

// async function getAllSongs() {
// 	try {
// 	  const data = await db.Song.findAll()
// 	  return data
// 	} catch (error) {
// 	  throw error;
// 	}
//   }

// const getAllSongs = async () => {

// 	try {
// 		const allSongs = await Song.findAll({
// 			limit: 15,
// 			order: [['createdAt', 'DESC']],
// 		});
// 		return allSongs;
// 	} catch (error) {
// 		console.error("Error fetching trend songs:", error);
// 		throw error;
// 	}

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
	uploadFunctionAdmin,
	getGenres
};