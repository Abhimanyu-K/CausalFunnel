const express = require("express");
const { body } = require("express-validator");
const authHandler = require("../controllers/auth");

const router = express.Router();

router.post(
  "/",
  [
    body("email").trim().isLength({ min: 3 }),
    body("password").trim().isLength({ min: 3 }),
  ],
  authHandler.login
);

router.post(
  "/reset",
  [body("email").trim().isLength({ min: 3 })],
  authHandler.reset
);

router.post("/reset/:token", authHandler.reset);

module.exports = router;
