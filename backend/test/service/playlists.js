
const db = require('../db/models');

async function createPlaylist(playlistId) {
  try {
    // const playlist = await Playlist.findByPk(playlistId);
    // if (!playlist) {
    //   throw new Error('Playlist not found');
    // }

    // const song = await Songs.findByPk(songId);
    // if (!song) {
    //   throw new Error('Songs not found');
    // }

    const data = await db.Playlist.create(playlistId)
    return data;
  } catch (error) {
    throw error;
  }
}

async function getPlaylists() {
  try {
    const data = await db.Playlist.findAll()
    return data
  } catch (error) {
    throw error;
  }
}

async function deletePlaylist(playlistId) {
  try {
    const playlist = await Playlist.findByPk(playlistId);
    if (!playlist) {
      throw new Error('Playlist not found');
    }

    await playlist.destroy();
    return { message: 'Playlist deleted successfully' };
  } catch (error) {
    throw error;
  }
}

async function updatePlaylist(playlistId, updatedFields) {
  try {
    const playlist = await Playlist.findByPk(playlistId);
    if (!playlist) {
      throw new Error('Playlist not found');
    }

    await playlist.update(updatedFields);
    return playlist;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createPlaylist,
  getPlaylists,
  deletePlaylist,
  updatePlaylist,
};
