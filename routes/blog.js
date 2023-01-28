const express = require("express");
const { body } = require("express-validator");
const { createBlog, deleteBlog, updateBlog } = require("../controllers/blog");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

router.post(
  "/create",
  [
    body("title").trim().isLength({ min: 2 }),
    body("description").trim().isLength({ min: 3 }),
  ],
  isAuth,
  createBlog
);

router.patch(
  "/update/:blogId",
  [
    body("title").trim().isLength({ min: 2 }),
    body("description").trim().isLength({ min: 3 }),
  ],
  isAuth,
  updateBlog
);

router.delete("/delete/:blogId", isAuth, deleteBlog);

module.exports = router;
