require("dotenv").config();

//External Modules
const express = require("express");
const methodOverride = require("method-override");
//const PORT = 3000;
// const session = require("express-session");
//Internal Modules
// const mainCTRL = require("./controllers/legoController.js");

//instance Modules
const app = express();

const PORT = process.env.PORT;
//Mongoose setup
const mongoose = require("mongoose");
const Lego = require("./models/Lego");
//mongoose.connect("mongodb://127.0.0.1:27017/iBrick");
mongoose.connection.once("open", () => {
  console.log("Connection to Mongo established");
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

//Internal Route
app.use("/lego", legoController);

app.listen(PORT, () => {
  console.log("Listening on port 3000");
});
