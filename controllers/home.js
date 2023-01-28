const Blog = require("../models/blog");

exports.getBlogs = (req, res, next) => {
  const page = req.params.page || 1;
  const limit = 10;

  Blog.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        result,
      });
    })
    .catch((err) => {
      res.status(404).json({ Error: err });
      next(err);
    });
};
