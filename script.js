const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT;

const LOC_HOME = "/";
const LOC_SIGNUP = "/signup";
const LOC_LOGIN = "/login";
const LOC_BLOG = "/blog";

const router_home = require("./routes/home");
const router_signup = require("./routes/signup");
const router_login = require("./routes/login");
const router_blog = require("./routes/blog");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(LOC_HOME, router_home);
app.use(LOC_SIGNUP, router_signup);
app.use(LOC_LOGIN, router_login);
app.use(LOC_BLOG, router_blog);

(async function () {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((result) => {
      app.listen(process.env.PORT || 8080, function () {
        console.log(`Connected on PORT ${PORT}`);
      });
    })
    .catch((err) => console.log("ERORR: ", err));
})();
