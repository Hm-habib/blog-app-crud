const blogsRoute = require("./blogRoutes");
const userRoute = require("./usersRoutes");
const guestRoute = require('./guestRoutes')


module.exports = (app) => {
  app.use("/blogs",  blogsRoute);
  app.use("/users", userRoute);
  app.use("/guest", guestRoute);
};
