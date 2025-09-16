const { ObjectId } = require("mongodb");
const blogModel = require('../model/blogModel')
const express = require("express");
const router = express.Router();

const runStart =  (req, res) => {
    res.render('index')
}

const blogsCreate = (req, res) => {
  res.render("blogs/create");
}

const blogsSave =  async (req, res) => {
  let runningUser = req.session.user;
  if (!runningUser) {
    return res.redirect("/login"); 
  }

  let blog = new blogModel({
    title: req.body.title,
    body: req.body.body,
    done: false,
    userId: runningUser._id, 
    
  }
  );

  await blog.save();
  res.redirect("/mainInterface");
}

const blogView = async (req, res) => {
  let runningUser = req.session.user;
  let blog = await blogModel.findById(req.params.id);
  res.render("blogs/view", { viewItem: blog, user: runningUser });
}

const blogOnlyView = async (req, res) => {
  let runningUser = req.session.user;
  let blog = await blogModel.findById(req.params.id);
  res.render("blogs/onlyView", { blog: blog, user: runningUser });
}

const backBTN =  (req, res) => {
  res.redirect("/mainInterface");
}

const editPage =  async (req, res) => {
  let runningUser = req.session.user;
  let blog = await blogModel.findById(req.params.id);
  res.render("blogs/edit", { editBlog: blog, user: runningUser });
}

module.exports= { 
    runStart,
    blogsCreate,
    blogsSave,
blogView,
blogOnlyView,
backBTN,
editPage,

 }