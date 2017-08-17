const express = require("express");
const router  = express.Router();

let user = { username: "1tacocat1", password: "imApalindrome"};

// root endpoint
router.get("/", function(req,res) {
  if (req.session.token) {
    res.render("results");
  } else {
    res.redirect("/login");
  }
});

// login endpoint
router.get("/login", function(req, res) {

  req.checkBody("username", "Username cannot be empty").notEmpty();
  req.checkBody("username", "Username must contain between 8 and 25 characters").len(8, 25);
  req.checkBody("password", "Password cannot be empty").notEmpty();
  req.checkBody("password", "Password must contain between 8 and 25 characters").len(8, 25);
  
 res.render("login");
});

// upon submiting
router.post("/results", function(req, res) {
  let obj = {
    username: req.body.username,
    password: req.body.password
  };

  if (obj.username == user.username && obj.password == user.password) {
    req.session.user = obj;
    req.session.token = "afs29628";
    res.render("results", obj);
  } else {
    res.redirect("/");
  }
});

//  logout button
router.get("/logout", function(req, res) {
  // req.session.destroy(); is good too
  req.session.destroy(function(err) {
    console.log(err);
  });

  res.redirect("/");
});


module.exports = router;
