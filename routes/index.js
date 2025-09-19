const blogsRoute = require("./blogRoutes");
const userRoute = require("./usersRoutes");
const guestRoute = require('./guestRoutes')

module.exports = (app) => {
  app.use("/", blogsRoute);
  app.use("/", userRoute);
  app.use("/", guestRoute);
};
