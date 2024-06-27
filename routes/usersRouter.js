const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user-model");

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
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let { email, password, fullname } = req.body;
      let user = await userModel.create({
        email,
        password,
        fullname,
      });
      res.send(user);
    } catch (error) {
      res.send(error.message);
    }
  }
);

module.exports = router;
