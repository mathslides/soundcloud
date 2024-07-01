const router = require("express").Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Song } = require("../../db/models");
const asyncHandler = require("express-async-handler");
const { singleMulterUpload, singlePublicFileUpload, imageUpload } = require("../../awsS3");
const db = require("../../db/models");
const { getAllSongs,
  getTrendSongs,
  getOneSong,
  uploadFunction,
  getAllAdminSongs,
  getOneAdminSong,
  uploadFunctionAdmin, 
  getGenres,
  deleteSong} = require("../../service/songs");

router.get(
  "/getAllSongs",
  asyncHandler(async (req, res) => {
    const { searchTerm } = req.query;
    try {
      const allSongs = await getAllSongs(searchTerm);
      return res.json(allSongs);
    } catch (error) {
      console.error("Error fetching songs:", error);
      return res.status(400).json({ error })
    }
  })
);



//! order matters!
router.get(
  "/trend",
  asyncHandler(async (req, res) => {
    const trendSongs = await getTrendSongs();
    return res.json({ trendSongs });
  })
);

// Get all genres
router.get('/getAllGenres', async (req, res) => {
  try {

      const genres = await getGenres();
      return res.json(genres);
  } catch (error) {
      console.error('Error fetching genres:', error.message);
      res.status(500).json({ error: 'Failed to fetch genres' });
  }
});



router.post("/upload", async (req, res) => {
  try {

    console.log("req.body", req.body);
    const response = await uploadFunction(req.body)
    return res.json(response);
  } catch (error) {
    console.error("Error uploading song:", error);
    return res.status(500).json({ error: "Error uploading song" });
  }
});

// Retrieve all admin songs (example route, ensure correct handling of admin-specific routes)
router.get(
  "/getAll",
  asyncHandler(async (req, res) => {
    const allSongs = await getAllAdminSongs()
    const songs = res.json(allSongs);
    return songs
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const songId = req.params.id;
    const currentSong = await getOneSong(songId);
    return res.json({ currentSong });
  })
);


// Delete song by ID
router.delete(
  "/delete/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const result = await deleteSong(id);
      return res.json(result);
    } catch (error) {
      console.error("Error deleting song:", error);
      return res.status(500).json({ message: "Failed to delete song" });
    }
  })
);

module.exports = router;
