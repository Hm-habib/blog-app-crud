const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const blogModel = require("../model/blogModel");

// logIn btn to mainInterface, mainInterface = views/index
const loggedInUser = async (req, res) => {
  const { username, password } = req.body;

  // match username, user input and database
  const user = await userModel.findOne({ username: username });
  if (!user) return res.send("username or password is incorrect");

  // match password, user input and database
  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.send("username or password is incorrect");

  req.session.user = user;

  res.redirect("/mainInterface");
};

const mainInterface = async (req, res) => {
  try {
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
  } catch (err) {
    console.error("Error in mainInterface:", err.message);
    res.status(500).send("Something went wrong!");
  }
};

const signupToLogin = async (req, res) => {
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

    req.session.user = user;
    await user.save();

    return res.render("users/login");
  } catch (err) {
    if (err.code === 11000) {
    } else if (err.name === "ValidationError") {
      res.status(400).send(err.message);
    } else {
      res.status(500).send("Server Error!");
    }
  }
};

module.exports = { loggedInUser, mainInterface, signupToLogin };
