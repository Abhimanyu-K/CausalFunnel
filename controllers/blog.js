const Blog = require("../models/blog");

exports.createBlog = (req, res, next) => {
  const { title, description } = req.body;
  const date = new Date();
  const userId = req.userId;

  const blog = new Blog({
    title,
    description,
    date,
    userId,
  });

  blog
    .save()
    .then((result) => {
      const { _id, title, description, createdAt } = result;

      const blog = {
        blogId: _id,
        title,
        desc: description,
        created_at: createdAt,
      };
      res.status(201).json({
        message: "Blog Created",
        blog: blog,
      });
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
      next(err);
    });
};

exports.updateBlog = (req, res, next) => {
  const blogId = req.params.blogId;
  const date = new Date();

  Blog.findById(blogId)
    .then((blog) => {
      if (blog === null) {
        const error = new Error("Could not find the blog");
        error.statusCode = 404;
        throw error;
      }
      if (blog.userId !== req.userId) {
        const error = new Error("Not Authorized");
        error.statusCode = 401;
        throw error;
      }
      blog.title = req.body.title || blog.title;
      blog.description = req.body.description || blog.description;
      blog.date = date;
      blog.save();
      res.status(201).json({ Updated: "Blog updated" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(500).json({ Error: err });
      next(err);
    });
};

exports.deleteBlog = (req, res, next) => {
  const blogId = req.params.blogId;

  Blog.findById(blogId)
    .then((blog) => {
      if (blog === null) {
        const error = new Error("Could not find the blog");
        error.statusCode = 404;
        throw error;
      }
      if (blog.userId.toString() !== req.userId) {
        const error = new Error("Not Authorized");
        error.statusCode = 401;
        throw error;
      }
      blog.deleteOne();
    })
    .then((result) => {
      res.status(200).json({ message: "Blog deleted" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.json({ Error: err });
      next(err);
    });
};
