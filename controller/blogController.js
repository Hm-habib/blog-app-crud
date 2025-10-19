const blogModel = require("../model/blogModel");

const blogsCreate = (req, res) => {
  res.render("blogs/create");
};

const blogsSave = async (req, res) => {
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
};

const blogView = async (req, res) => {
  let runningUser = req.session.user;
  let blog = await blogModel.findById(req.params.id);
  res.render("blogs/view", { viewItem: blog, user: runningUser });
};

const blogOnlyView = async (req, res) => {
  let blog = await blogModel.findById(req.params.id);
  res.render("blogs/onlyView", { blog: blog,});
};

const backBTN = (req, res) => {
  res.redirect("/mainInterface");
};

const editPage = async (req, res) => {
  let runningUser = req.session.user;
  let blog = await blogModel.findById(req.params.id);
  res.render("blogs/edit", { editBlog: blog, user: runningUser });
};

const saveEditToView = async (req, res) => {
  let blog = await blogModel.findById(req.params.id);
  blog.title = req.body.title;
  blog.body = req.body.body;
  blog.done = false;

  await blog.save();
  res.redirect(`/blog/${req.params.id}/view`);
};

const markDone = async (req, res) => {
  let blog = await blogModel.findByIdAndUpdate(req.params.id);
  blog.done = true;
  await blog.save();
  res.redirect(`/blog/${req.params.id}/view`);
};

const deleteBTN = async (req, res) => {
  try {
    const runningUser = req.session.user;
    if (!runningUser) {
      return res.status(401).send("Please log in");
    }

    const blog = await blogModel.findById(req.params.id);
    if (!blog) return res.status(404).send("Blog not found");

    // Admin can delete any blog OR user can delete their own blog
    if (
      runningUser.role !== "admin" &&
      blog.userId.toString() !== runningUser._id.toString()
    ) {
      return res.status(403).send("Unauthorized to delete this blog");
    }

    await blogModel.findByIdAndDelete(req.params.id);
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).send("Internal Server Error");
  }

  res.redirect("/mainInterface");
};

module.exports = {
  blogsCreate,
  blogsSave,
  blogView,
  blogOnlyView,
  backBTN,
  editPage,
  saveEditToView,
  markDone,
  deleteBTN,
};
