const { Song } = require("../db/models/index");

const getAllSongs = async () => {
	const allSongs = await Song.findAll();
	return allSongs;
};

const getTrendSongs = async () => {
	const trendSongs = await Song.findAll({ limit: 12 });
	return trendSongs;

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

	}
};

module.exports = {
	getAllSongs,
	getTrendSongs,
	getOneSong,
	uploadFunction
};