const express = require("express");
const bcrypt = require("bcrypt");
const alert = require("alert");
const User = require("../models/users");

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("users/register.ejs");
});

router.post("/register", (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(req.body.password, salt);

  User.findOne({ username: req.body.username }, (err, userExists) => {
    if (userExists) {
      // alert("that user name already exist");
      res.send("that user name already exist");
    } else {
      User.create(req.body, (err, createdUser) => {
        req.session.currentUser = createdUser;
        res.redirect("/");
      });
    }
  });
});

router.get("/signin", (req, res) => {
  res.render("users/signin.ejs");
});

router.post("/signin", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (foundUser) {
      const validLogin = bcrypt.compareSync(
        req.body.password,
        foundUser.password
      );
      if (validLogin) {
        req.session.currentUser = foundUser;
        res.redirect("/lego");
      } else {
        // alert("invalid username or password");
        res.send("invalid username or password");
      }
    } else {
      // alert("invalid username or password");
      res.send("invalid username or password");
    }
  });
});

//DESTROY SESSION ROUTE
router.get("/signout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
