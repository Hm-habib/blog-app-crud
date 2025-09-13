const { ObjectId } = require("mongodb");
const express = require("express");
const router = express.Router();
const blogModel = require("../model/blogModel");
const blogController = require("../controller/blogController");

// port=3000 run to homePage
router.get("/", blogController.runStart);

// blog create btn to create form 
router.get("/blog/create", (req, res) => {
  res.render("blogs/create");
});

// blog save btn to mainInterface 
router.post("/blog/save", async (req, res) => {
  let runningUser = req.session.user;
  if (!runningUser) {
    return res.redirect("/login"); 
  }

  let blog = new blogModel({
    title: req.body.title,
    body: req.body.body,
    done: false,
    userId: runningUser._id, 
  });

  await blog.save();
  res.redirect("/mainInterface");
});

// view btn to view page
router.get("/blog/:id/view", async (req, res) => {
  let runningUser = req.session.user;
  let blog = await blogModel.findById(req.params.id);
  res.render("blogs/view", { viewItem: blog, user: runningUser });
});

// all blogs view btn to onlyView page
router.get("/blog/:id/onlyView", async (req, res) => {
  let runningUser = req.session.user;
  let blog = await blogModel.findById(req.params.id);
  res.render("blogs/onlyView", { blog: blog, user: runningUser });
});

// back btn to mainInterface 
router.get("/blog/:id/back", (req, res) => {
  res.redirect("/mainInterface");
});

// edit btn to edit page
router.get("/blog/:id/edit", async (req, res) => {
  let runningUser = req.session.user;
  let blog = await blogModel.findById(req.params.id);
  res.render("blogs/edit", { editBlog: blog, user: runningUser });
});

// save edit btn to view page
router.post("/blog/:id/save-edit", async (req, res) => {
  let blog = await blogModel.findByIdAndUpdate(req.params.id);
  blog.title = req.body.title;
  blog.body = req.body.body;
  blog.done = false;

  await blog.save();
  res.redirect(`/blog/${req.params.id}/view`);
});

// edit cancel btn to view page
router.get("/blog/:id/edit/cancel", (req, res) => {
  res.redirect(`/blog/${req.params.id}/view`);
});

// markDone btn to refresh view page and markDone complete
router.post("/blog/:id/markDone", async (req, res) => {
  let blog = await blogModel.findByIdAndUpdate(req.params.id);
  blog.done = true;
  await blog.save();
  res.redirect(`/blog/${req.params.id}/view`);
});

// delete btn to refresh mainInterface and delete item
router.post("/blog/:id/delete", async (req, res) => {
  let blog = await blogModel.findById(req.params.id);
  await blog.deleteOne({ _id: blogModel.findById(req.params.id) });
  res.redirect("/mainInterface");
});

// create cancel btn to mainInterface 
router.get("/blog/create/cancel",(req, res) => {
  res.redirect("/mainInterface");
})



module.exports = router;
