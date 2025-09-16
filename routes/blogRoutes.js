const { ObjectId } = require("mongodb");
const express = require("express");
const router = express.Router();
const blogModel = require("../model/blogModel");
const blogController = require("../controller/blogController");

// port=3000 run to homePage
router.get("/", blogController.runStart);

// blog create btn to create form 
router.get("/blog/create", blogController.blogsCreate)

// blog save btn to mainInterface 
router.post("/blog/save",blogController.blogsSave);

// view btn to view page
router.get("/blog/:id/view",blogController.blogView);

// all blogs view btn to onlyView page
router.get("/blog/:id/onlyView",blogController.blogOnlyView);

// back btn to mainInterface 
router.get("/blog/:id/back",blogController.backBTN);

// edit btn to edit page
router.get("/blog/:id/edit",blogController.editPage);

// save edit btn to view page
router.post("/blog/:id/save-edit", async (req, res) => {
  let blog = await blogModel.findByIdAndUpdate(req.params.id)
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
  const runningUser = req.session.user;
  if (!runningUser) {
    return res.status(401).send("Please log in");
  }

  const blog = await blogModel.findById(req.params.id);
  if (!blog) return res.status(404).send("Blog not found");

  // Admin can delete any blog OR user can delete their own blog
  if (runningUser.role !== "admin" && blog.userId.toString() !== runningUser._id.toString()) {
    return res.status(403).send("Unauthorized to delete this blog");
  }

  await blogModel.findByIdAndDelete(req.params.id);
  res.redirect("/mainInterface");
});


// create cancel btn to mainInterface 
router.get("/blog/create/cancel",(req, res) => {
  res.redirect("/mainInterface");
})



module.exports = router;
