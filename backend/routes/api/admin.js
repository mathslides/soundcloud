const router = require("express").Router();
const sessionRouter = require("./session.js");
const authRouter = require("./auth.js");
const usersRouter = require("./users.js");
const songsRouter = require("./songs.js");
const commentsRouter = require("./comments.js");
const playlistRoutes = require("./playlist.js");
const playlistSongsRoutes = require("./playlistSongs.js");
const likedSongs = require("./liked.js");
const emailVerificationRoutes = require("./emailVerification.js");


router.use("/users", usersRouter);
router.use("/songs", songsRouter);
// router.use("/admin/songs", songsRouter);
router.use("/comments", commentsRouter);
router.use("/playlist", playlistRoutes);
router.use("/playlistSongs", playlistSongsRoutes);
router.use("/likedSongs", likedSongs);
router.use("/emailVerification", emailVerificationRoutes);

module.exports = router;
