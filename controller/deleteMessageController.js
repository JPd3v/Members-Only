const { body, validationResult } = require("express-validator");
const Message = require("../models/message");

exports.post_delete_message_form = [
  body("message_id", "invalid id").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(errors);
    }

    if (req.user.admin_status === true) {
      Message.findByIdAndDelete(req.body.message_id, {}, (err, message) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
      return;
    }
    res.redirect("/");
  },
];
