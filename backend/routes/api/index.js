const router = require("express").Router();
const sessionRouter = require("./session.js");
const authRouter = require("./auth.js");
const usersRouter = require("./users.js");
const songsRouter = require("./songs.js");
const commentsRouter = require("./comments.js");
const playlistRoutes = require("./playlist.js");
const playlistSongsRoutes = require("./playlistSongs.js");
const likedSongs = require("./liked.js");
const adminRoutes = require("./admin.js");
const emailVerificationRoutes = require("./emailVerification.js");


const asyncHandler = require("express-async-handler");
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth.js");
const { User } = require("../../db/models");
const verifyToken = require("../../middleware/authMiddleware.js");

router.use("/admin/auth", authRouter);
router.use("/admin",verifyToken, adminRoutes);
// router.use("/admin", adminRoutes);
router.use("/session", sessionRouter);
router.use("/songs", songsRouter);
router.use("/users", usersRouter);
router.use("/comments", commentsRouter);
router.use("/playlist", playlistRoutes);
router.use("/playlistSongs", playlistSongsRoutes);
router.use("/likedSongs", likedSongs);
router.use("/emailVerification", emailVerificationRoutes);

// setting the user token test
router.get(
  "/set-token-cookie",
  asyncHandler(async (req, res) => {
    const user = await User.findOne({
      where: {
        username: "Demo",
      },
    });
    setTokenCookie(res, user);
    return res.json({ user });
  })
);

// restoring the user test
router.get("/restore-user", restoreUser, (req, res) => {
  return res.json(req.user);
});

// require auth test route
router.get("/require-auth", requireAuth, (req, res) => res.json(req.user));

module.exports = router;
