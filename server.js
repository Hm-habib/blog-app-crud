require("dotenv").config();
const express = require("express");
const app = express();
const layout = require("express-ejs-layouts");
const { mongooseConnect } = require("./dbConnection/db");
const session = require("express-session");

const port = 3000;

mongooseConnect();

app.use(
  session({
    secret: process.env.SESSION_STRING,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 30,
    },
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(layout);



require("./routes")(app);




app.listen(port, () => {
  console.log(`Server has started on port ${port} `);
});
