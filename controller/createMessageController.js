const { body, validationResult } = require("express-validator");
const Message = require("../models/message");

exports.get_create_message_form = (req, res) => {
  res.render("create-message");
};

exports.post_create_message_form = [
  body("title", "tile must not be empty").trim().isLength({ min: 1 }).escape(),
  body("message", "message must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(req.user._id);
      console.log(req.user);
      res.render("create-message", {
        errors: errors.array(),
      });
      return;
    }

    const message = new Message({
      title: req.body.title,
      text: req.body.message,
      author: req.user._id,
      date: new Date(),
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  },
];
