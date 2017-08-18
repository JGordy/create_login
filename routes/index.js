const express = require("express");
const router  = express.Router();

let user = { username: "1tacocat1", password: "imApalindrome"};
let messages = [];

// root endpoint
router.get("/", function(req,res) {
  if (req.session.token) {
    let obj = {username: user.username}
    res.render("results", obj);
  } else {
    res.redirect("/login");
  }
});

// login endpoint
router.get("/login", function(req, res) {
 res.render("login", {messages});
 messages = [];
});

// upon submiting
router.post("/results", function(req, res) {
  let obj = {
    username: req.body.username,
    password: req.body.password
  };
  messages = [];

  req.checkBody("username", "Username cannot be empty!").notEmpty();
  req.checkBody("username", "Username must contain between 8 and 25 characters!").len(8, 25);
  // req.checkBody("username", "Username cannot contain special characters. Ex: @!*").isAlphanumeric("en-US")
  req.checkBody("password", "Password cannot be empty!").notEmpty();
  req.checkBody("password", "Password must contain between 8 and 25 characters!").len(8, 25);
  // req.checkBody("Password", "Password cannot contain special characters. Ex: @!*").isAlphanumeric("en-US")

  let errors = req.getValidationResult();
  // let messages = [];

  errors.then(function(result) {
    result.array().forEach(function(error) {
      messages.push(error.msg);
    });

    let errObject = {
      errors: messages,
      info: req.body
    };

      if (obj.username == user.username && obj.password == user.password) {
        req.session.user = obj;
        req.session.token = "afs29628";
        res.render("results", obj);
      } else if (messages !== []) {
      console.log("why?????");
      res.redirect("/",)
      } else {
        res.redirect("/");
      }
    });
  });

//  logout button
router.get("/logout", function(req, res) {
  req.session.destroy(function(err) {
    console.log(err);
  });
  res.redirect("/");
});


module.exports = router;
