const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
const { User } = require("../../db/models");
const db = require("../../db/models");
const { Op } = require("sequelize");
const { getAllUsers, getOneUser, joinArtist, deleteUser, approveArtist, rejectArtist } = require("../../service/users");

// validation middleware for sign up and
const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// sign up



router.post(
  '/signup',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, username, password, verificationCode } = req.body;
    try {
      const verificationEntry = await db.EmailVerification.findOne({
        where: {
          code: verificationCode,
          expiredAt: { [Op.gt]: new Date() } 
        }
      });
      if (!verificationEntry) {
        return res.status(400).json({ message: 'Verification code is incorrect or expired.' });
      }
      const user = await User.signup({ email, username, password });
      await setTokenCookie(res, user);
      return res.json({ user });
    } catch (error) {
      console.error('Error signing up user:', error);
      return res.status(500).json({ message: 'Failed to sign up user. Please try again later.' });
    }
  })
);



// Get all users
router.get(
  "/getAllUsers",
  asyncHandler(async (req, res) => {
    const users = await getAllUsers();
    return res.json(users);
  })
);

// Get one user by ID
router.get(
  "/getOne/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await getOneUser(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  })
);

// Update user by ID
router.put(
  "/update/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userData = req.body;
    try {
      const user = await joinArtist(id, userData);
      return res.json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ message: "Failed to update user" });
    }
  })
);
// Update user by ID
router.put(
  "/approve/update/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userData = req.body;
    try {
      const user = await approveArtist(id, userData);
      return res.json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ message: "Failed to update user" });
    }
  })
);
// Update user by ID
router.put(
  "/reject/update/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userData = req.body;
    try {
      const user = await rejectArtist(id, userData);
      return res.json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ message: "Failed to update user" });
    }
  })
);

// Delete user by ID
router.delete(
  "delete/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const result = await deleteUser(id);
      return res.json(result);
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ message: "Failed to delete user" });
    }
  })
);


module.exports = router;
