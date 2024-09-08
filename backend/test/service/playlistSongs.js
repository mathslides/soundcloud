const db = require('../db/models');

async function addSongToPlaylist(playlistId, songId) {
  try {
    const data = {
      ...playlistId,
      songId: playlistId.songId,
      playlistId: playlistId.playlistId,

    }
    const playlistSong = await db.PlaylistSongs.create(data);
    return playlistSong;
  } catch (error) {
    throw error;
  }
}
async function getSongsInPlaylist() {
  try {
    const songs = await db.PlaylistSongs.findAll({
      include: [
        {
          model: db.Song,
        },
        {
          model: db.Playlist,
        }
      ],
    });
    return songs;
  } catch (error) {
    throw error;
  }
}



async function deleteSongFromPlaylist(playlistId, songId) {
  try {
    const playlistSong = await db.PlaylistSongs.findOne({
      where: {
        playlistId,
        songId,
      },
    });

    if (!playlistSong) {
      throw new Error('Playlist Song not found');
    }

    await playlistSong.destroy();
    return { message: 'Song deleted from playlist successfully' };
  } catch (error) {
    throw error;
  }
}

async function updatePlaylistSong(playlistId, songId, updatedFields) {
  try {
    const playlistSong = await db.PlaylistSongs.findOne({
      where: {
        playlistId,
        songId,
      },
    });

    if (!playlistSong) {
      throw new Error('Playlist Song not found');
    }

    await playlistSong.update(updatedFields);
    return playlistSong;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addSongToPlaylist,
  getSongsInPlaylist,
  deleteSongFromPlaylist,
  updatePlaylistSong,
};
