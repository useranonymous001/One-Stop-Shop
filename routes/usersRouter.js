const express = require("express");
const router = express.Router();
const userModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { generateToken } = require("../utils/generatetoken");
const isLoggedIn = require("../middlewares/isLoggedIn");

// requiring authController for registerUser function
const {
  registerUser,
  loginUser,
  logout,
} = require("../controllers/authController");

// login or sign up routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);

module.exports = router;
