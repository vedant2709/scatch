const express = require("express");
const router = express.Router();
const { registerUser,loginUser,logout } = require("../controllers/authController");
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const cookie = require("cookie-parser");
const { generateToken } = require("../utils/generateToken");

router.get("/", function (req, res) {
  res.send("hey it's working from users route");
});

router.post(
  "/register",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Enter a valid email address"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters long"),
    body("fullname")
      .notEmpty()
      .withMessage("Full name is required")
      .isLength({ min: 1 })
      .withMessage("Full name cannot be empty"),
  ],
  registerUser
);

router.post("/login",loginUser)

router.get("/logout",logout)

module.exports = router;
