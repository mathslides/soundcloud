const express = require('express');
const { createEmailEntry, getEmailEntries, deleteEmailEntry, updateEmailEntry,emailVerify } = require('../../service/emailVerification');
const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const response = await createEmailEntry(req.body);
    
    return res.json(response);

  } catch (error) {
    console.error('Error verifying email:', error.message);
    res.status(500).json({ error: 'Failed to verify email' });
  }
});
router.post('/test', async (req,res) => {
  try {
    const response = await emailVerify();
    return res.json(response);

  } catch (error) {
    console.error('Error verifying email:', error.message);
    // res.status(500).json({ error: 'Failed to verify email' });
  }
});

router.get('/get-all', async (req, res) => {
  try {
    const response = await getEmailEntries();
    return res.json(response);

  } catch (error) {
    console.error('Error getting liked songs:', error.message);
    res.status(500).json({ error: 'Failed to get liked songs' });
  }
});

router.get('/delete', async (req, res) => {
  const { songId } = req.params;

  try {
    const response = await deleteEmailEntry(songId);
    return res.json(response);

  } catch (error) {
    console.error('Error deleting liked song:', error.message);
    res.status(500).json({ error: 'Failed to delete liked song' });
  }
});

router.put('/update', async (req, res) => {
  const { songId } = req.params;
  const { updatedFields } = req.body;

  try {
    const response = await updateEmailEntry(songId, updatedFields);
    return res.json(response);

  } catch (error) {
    console.error('Error updating liked song:', error.message);
    res.status(500).json({ error: 'Failed to update liked song' });
  }
});

module.exports = router;
