const express = require("express");
const { body } = require("express-validator");
const authHandler = require("../controllers/auth");

const router = express.Router();

router.post(
  "/",
  [
    body("name").trim().isLength({ min: 2 }),
    body("email").trim().isLength({ min: 3 }),
    body("password").trim().isLength({ min: 3 }),
  ],
  authHandler.signup
);

module.exports = router;
