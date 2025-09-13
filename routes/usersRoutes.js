// const { ObjectId } = require("mongodb");
const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");
const blogModel = require("../model/blogModel");
const userController = require("../controller/userController");

// log-in btn to mainInterface
router.post("/user/login", userController.loggedInUser);

// mainInterface = blogs/index
router.get("/mainInterface", async (req, res) => {
  let runningUser = req.session.user || null; // guest = null

  let blogs = [];
  if (runningUser) {
    blogs = await blogModel.find({ userId: runningUser._id });
  }

  const allBlogs = await blogModel.find().populate("userId", "username");

  res.render("blogs/index", {
    items: blogs,
    user: runningUser || null,
    allBlogs,
  });
});

// signup btn to signup form
router.get("/signup-user", (req, res) => {
  res.render("users/signup");
});

router.post("/user-signup-ok", async (req, res) => {
  try {
    const { username, email } = req.body;

    let existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .send("This username already taken , please enter unique username!");
    }

    let existingUserEmail = await userModel.findOne({ email });
    if (existingUserEmail) {
      return res
        .status(400)
        .send(
          "This email already has been stored in database,  please enter unique email address."
        );
    }

    let user = new userModel(req.body);

    await user.save();
    req.session.user = user;
    res.render("users/login");
  } catch (err) {
    if (err.code === 11000) {
    } else if (err.name === "ValidationError") {
      res.status(400).send(err.message);
    } else {
      res.status(500).send("Server Error!");
    }
  }
});

// login btn to login form
router.get("/login", (req, res) => {
  res.render("users/login");
});


// logout btn to homePage
router.post("/user-logout", async (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
