const router = require("express").Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Song } = require("../../db/models");
const asyncHandler = require("express-async-handler");
const { singleMulterUpload, singlePublicFileUpload, imageUpload } = require("../../awsS3");
const db = require("../../db/models");
const { getAllSongs, getTrendSongs, getOneSong, uploadFunction } = require("../../service/songs");

// retrieving all the songs
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const allSongs = await getAllSongs()
    return res.json(allSongs);
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

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const songId = req.params.id;
    const currentSong = await getOneSong(songId);
    return res.json({ currentSong });
  })
);



router.post("/upload",async (req, res) => {
  try {

    const response =await uploadFunction(req.body)
    return res.json(response);
  } catch (error) {
    console.error("Error uploading song:", error);
    return res.status(500).json({ error: "Error uploading song" });
  }
});

module.exports = router;
