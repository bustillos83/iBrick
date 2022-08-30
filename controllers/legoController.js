const express = require("express");
const router = express.Router();
const Lego = require("../models/Lego.js");

const db = require("../models");

//Authentication
const authRequired = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.send("You need to log in to do that");
  }
};

// router.get("/", (req, res) => {
//   db.Lego.find().then((results) => {
//     const context = { allLego: results };
//     res.render("index.ejs", context);
//   });
// });

// //INDEX
router.get("/", async (req, res) => {
  //console.log("before");
  let lego = await Lego.find({});
  //console.log("lego", lego);
  res.render("index.ejs", { lego });
});

//NEW
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

//CONTACT
router.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

//SHOW
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

//CREATE
router.post("/", (req, res) => {
  if (req.body.retired === "on") {
    req.body.retired = true;
  } else {
    req.body.retired = false;
  }
  console.log(req.body);
  Lego.create(req.body, (error, createLego) => {
    if (error) {
      console.log("error", error);
      res.send(error);
    } else {
      res.redirect("/lego");
    }
  });
});

//DESTROY
router.delete("/:id", (req, res) => {
  Lego.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) console.log(err);
    res.redirect("/lego");
  });
});

//EDIT
router.get("/:id/edit", authRequired, (req, res) => {
  Lego.findById(req.params.id, (err, foundLego) => {
    res.render("edit.ejs", { lego: foundLego });
  });
});

//UPDATE
router.put("/id", (req, res) => {
  if (req.body.retired === "on") {
    req.body.retired = true;
  } else {
    req.body.retired = false;
  }
  Lego.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updateModel) => {
      res.redirect("/lego");
    }
  );
});

module.exports = router;
