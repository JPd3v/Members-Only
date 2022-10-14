const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.get_role_form_get = (req, res) => {
  res.render("become-member", {
    title: "Become Member",
  });
};

exports.get_role_form_post = [
  body("secret_code", "you must insert a code if want to get a role")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("become-member", {
        title: "get a role",
        errors: errors.array(),
      });
      return;
    }
    console.log(process.env.MEMBER_SECRET_KEY);
    console.log(process.env.ADMIN_SECRET_KEY);
    if (req.body.secret_code === process.env.MEMBER_SECRET_KEY) {
      User.findByIdAndUpdate(
        req.user._id,
        { membership_status: true },
        {},
        (err, user) => {
          if (err) {
            return next(err);
          }

          res.redirect("/");
        }
      );
      return;
    }

    if (req.body.secret_code === process.env.ADMIN_SECRET_KEY) {
      User.findByIdAndUpdate(
        req.user._id,
        { admin_status: true },
        {},
        (err, user) => {
          if (err) {
            return next(err);
          }
          res.redirect("/");
        }
      );
      return;
    }

    // if (req.body.secret_code === process.env.ADMIN_SECRET_KEY) {
    //   User.findByIdAndUpdate(
    //     req.user._id,
    //     { membership_status: false },
    //     {},
    //     (err, user) => {
    //       if (err) {
    //         return next(err);
    //       }
    //       res.redirect("/");
    //     }
    //   );
    // }
    res.render("become-member", {
      title: "get a role",
      errors: [{ msg: "secret code provided is not correct " }],
    });
  },
];
