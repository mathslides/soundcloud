const express = require('express');
const { addLikedSong, getLikedSongsByUser, removeLiked, updateLiked } = require('../../service/liked');
const router = express.Router();

router.post('/add-liked-song', async (req, res) => {
  const { songId } = req.body;

  try {
    const response = await addLikedSong(songId);
    return res.json(response);

  } catch (error) {
    console.error('Error adding liked song:', error.message);
    res.status(500).json({ error: 'Failed to add liked song' });
  }
});

router.get('/get-all-liked-songs', async (req, res) => {
  try {
    const response = await getLikedSongsByUser();
    return res.json(response);

  } catch (error) {
    console.error('Error getting liked songs:', error.message);
    res.status(500).json({ error: 'Failed to get liked songs' });
  }
});

router.get('/delete-liked-song/:songId', async (req, res) => {
  const { songId } = req.params;

  try {
    const response = await removeLiked(songId);
    return res.json(response);

  } catch (error) {
    console.error('Error deleting liked song:', error.message);
    res.status(500).json({ error: 'Failed to delete liked song' });
  }
});

router.put('/update-liked-song/:songId', async (req, res) => {
  const { songId } = req.params;
  const { updatedFields } = req.body;

  try {
    const response = await updateLiked(songId, updatedFields);
    return res.json(response);

  } catch (error) {
    console.error('Error updating liked song:', error.message);
    res.status(500).json({ error: 'Failed to update liked song' });
  }
});

module.exports = router;
