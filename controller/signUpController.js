const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.user_create_get = (req, res) => {
  res.render("sign-up", {
    title: "sign-up",
    user: { username: "", first_name: "", last_name: "" },
  });
};

exports.user_create_post = [
  body("first_name", "name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("last_name", "last name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("username", "email must not be empty")
    .trim()
    .isLength({ min: 1 })
    .normalizeEmail()
    .isEmail()
    .withMessage("email provided not valid")
    .escape(),
  body("password", "password must not be empty")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body(
    "confirm_password",
    "confirm password and password field must have the same value"
  )
    .trim()
    .isLength({ min: 6 })
    .custom((value, { req }) => value === req.body.password)
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const user = new User({
      username: req.body.username,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      membership_status: false,
    });

    if (!errors.isEmpty()) {
      res.render("sign-up", {
        title: "Sign Up",
        errors: errors.array(),
        user,
      });
      return;
    }

    User.findOne({ username: req.body.username }).exec((err, found_user) => {
      if (err) {
        return next(err);
      }

      if (found_user) {
        console.log("error");
        return res.render("sign-up", {
          title: "Sign Up",
          errors: [
            { msg: "email already in use, please select a new email address" },
          ],
          user,
        });
      }
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          next(err);
        }

        const user = new User({
          username: req.body.username,
          password: hashedPassword,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          membership_status: false,
        }).save((err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/");
        });
      });
    });
  },
];
