require("dotenv").config();
const express = require("express");
const app = express();

const methodOverride = require("method-override");
const session = require("express-session");

//PORT
const PORT = process.env.PORT;

//Mongoose setup
const mongoose = require("mongoose");
const Lego = require("./models/Lego");

//mongoose.connect("mongodb://127.0.0.1:27017/iBrick");
mongoose.connection.once("open", () => {
  console.log("Connection to Mongo established");
});

//SESSIONS
const SESSION_SECRET = process.env.SESSION_SECRET;
//console.log("Here is the session secret");
//console.log(SESSION_SECRET);
// now we can set up our session with our secret

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false, // https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false, // https://www.npmjs.com/package/express-session#resave
  })
);
//CUSTOM MIDDLEWARE
app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser;

  // if (req.session.currentUser) {
  //   res.locals.authenticated = true
  //}
  next();
});

//Middleware
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const legoController = require("./controllers/legoController.js");
app.use("/lego", legoController);

//ROUTES & Controllers

//Home route
app.get("/", (req, res) => {
  res.render("home");
});
const userController = require("./controllers/userController.js");
app.use("/users", userController);

app.listen(PORT, () => {
  console.log("Listening on port 3000");
});
