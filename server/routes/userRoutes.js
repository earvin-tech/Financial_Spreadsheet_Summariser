const express = require("express");
const {
  registerUser,
  loginUser,
  deleteUser,
  updatePassword,
  getCurrentUser,
} = require("../controllers/userController");

const {
  validateRegister,
  validatePasswordUpdate,
  validateLogin,
  validateDeleteUser,
} = require("../middleware/validateUser");

const router = express.Router();

// POST /api/users - Register user
router.post("/register", validateRegister, registerUser);

// POST /api/users/login - Login
router.post("/login", validateLogin, loginUser);

// GET /api/users/me - Get current user
router.get("/me", getCurrentUser);

// PATCH /api/users/me - Update user password
router.patch("/me", validatePasswordUpdate, updatePassword);

// DELETE /api/users/me - Delete account
router.delete("/me", validateDeleteUser, deleteUser);

module.exports = router;
