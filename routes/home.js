const express = require("express");
const { getBlogs } = require("../controllers/home");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

router.get("/", isAuth, getBlogs);

module.exports = router;
