const express = require("express");
const bcrypt = require("bcrypt");

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
      res.send("that user name already exist");
    } else {
      User.create(req.body, (err, createdUser) => {
        req.session.currentUser = createdUser;
        res.redirect("/lego");
      });
    }
  });
});
