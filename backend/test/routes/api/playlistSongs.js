const express = require('express');
const { addSongToPlaylist, getSongsInPlaylist } = require('../../service/playlistSongs');
const router = express.Router();

router.post('/add-song-to-playlist', async (req, res) => {
  const { playlistId, songId } = req.body;

  try {
    const response = await addSongToPlaylist(playlistId, songId);
    return res.json(response);

  } catch (error) {
    console.error('Error adding song to playlist:', error.message);
    res.status(500).json({ error: 'Failed to add song to playlist' });
  }
});

router.get('/getAllPlaylistSongs', async (req, res) => {
  try {
    const response = await getSongsInPlaylist();
    return res.json(response);
  } catch (error) {
    console.error('Error getting songs in playlist:', error.message);
    res.status(500).json({ error: 'Failed to get songs in playlist' });
  }
});


router.get('/get-songs-in-playlist/:playlistId', async (req, res) => {
  const { playlistId } = req.params;

  try {
    const response = await getSongsInPlaylist(playlistId);
    return res.json(response);

  } catch (error) {
    console.error('Error getting songs in playlist:', error.message);
    res.status(500).json({ error: 'Failed to get songs in playlist' });
  }
});

module.exports = router;
