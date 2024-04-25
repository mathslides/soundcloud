
const express = require('express');
const { addSongToPlaylist, getPlaylists } = require('../../service/playlists');
const router = express.Router();

router.post('/add-song-to-playlist', async (req, res) => {
  const { playlistId } = req.body;

  try {
    const response = await addSongToPlaylist(playlistId);
    return res.json(response);

  } catch (error) {
    console.error('Error adding song to playlist:', error.message);
    res.status(500).json({ error: 'Failed to add song to playlist' });
  }
});
router.get('/getAll', async (req, res) => {

  try {
    const response = await getPlaylists();
    return res.json(response);
 
  } catch (error) {
    console.error('Error adding song to playlist:', error.message);
    res.status(500).json({ error: 'Failed to add song to playlist' });
  }
});

module.exports = router;
