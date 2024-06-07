const router = require("express").Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const asyncHandler = require("express-async-handler");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require("../../middleware/authMiddleware");

//log in middleware
const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

router.post('/login', validateLogin, asyncHandler(async (req, res, next) => {
  const { credential, password } = req.body;
  try {
    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }
    // Set JWT token cookie
    const token = await setTokenCookie(res, user);
    return res.json({ user, token });
  } catch (error) {
    const err = new Error('Server error');
    err.status = 500;
    return next(err);
  }
}));
// log out admin
router.delete("/logout", verifyToken, (_req, res) => {
  console.log("logout admin------");
  res.clearCookie("token");
  return res.json({ message: "success" });
});

// Restore session user
router.get("/", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject(),
    });
  } else return res.json({});
});

module.exports = router;

