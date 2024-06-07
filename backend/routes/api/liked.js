const express = require('express');
const { addLikedSong, getLikedSongsByUser, removeLiked, updateLiked } = require('../../service/liked');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/add-liked-song', async (req, res) => {
  const { songId } = req.body;

  try {

    const transporter = nodemailer.createTransport({
      host: 'pro8.taxiappsdemo.com',
      port: 465,
      secure: true, 
      auth: {
        user: 'mailto:deactivate@taxiappsdemo.com',
        pass: 'MBbt35PiV3x9P'
      }
    });
    
    const mailOptions = {
      from: '"UBER APP PRO" <mailto:deactivate@taxiappsdemo.com>',
      to: 'mailto:khizerjaved25@gmail.com', 
      subject: 'Test Email',
      text: 'Hello, this is a test email!',
      html: '<p>Hello, this is a <b>test email</b>!</p>'
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
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
