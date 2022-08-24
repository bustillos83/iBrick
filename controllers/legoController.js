const express = require("express");
const router = express.Router();
const Lego = require("../models/Lego.js");

const db = require("../models");

// router.get("/", (req, res) => {
//   db.Lego.find().then((results) => {
//     const context = { allLego: results };
//     res.render("index.ejs", context);
//   });
// });

// //Index
router.get("/", async (req, res) => {
  console.log("before");
  let lego = await Lego.find({});
  console.log("lego", lego);
  res.render("index.ejs", { lego });
});

//New
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

//Show
router.get("/:id", async (req, res) => {
  const lego = await Lego.findById(req.params.id);
  res.render("show.ejs", {
    lego: lego,
  });
});
// router.get("/:id", async (req, res) => {
//   console.log("lego");
//   Lego.findById(req.params.id, (error, lego) => {
//     res.render("show.ejs", {
//       lego: lego,
//     });
//   });
// });

module.exports = router;
