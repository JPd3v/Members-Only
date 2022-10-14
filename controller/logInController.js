const { body, validationResult } = require("express-validator");
const passport = require("passport");

exports.user_login_get = (req, res) => {
  res.render("log-in", { title: "Log In" });
};

exports.user_login_post = [
  body("username", "email must not be empty ")
    .trim()
    .isLength({ min: 1 })
    .isEmail()
    .withMessage("Please enter insert a valid email")
    .escape(),
  body("password", "password must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("log-in", {
        title: "Log In",
        errors: errors.array(),
      });
      return;
    }
    next();
  },
];
exports.user_login_auth = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
});
