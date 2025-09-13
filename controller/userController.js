const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const blogModel = require("../model/blogModel");

// logIn btn to mainInterface
const loggedInUser =  async (req, res) => {
  const { username, password } = req.body;

  // match username, user input and database
  const user = await userModel.findOne({ username: username });
  if (!user) res.send("username or password is incorrect");

  // match password, user input and database
  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) res.send("username or password is incorrect");

  req.session.user = user;

  res.redirect("/mainInterface");
};



module.exports = { loggedInUser }



