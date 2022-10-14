const Messages = require("../models/message");

exports.get_index = (req, res, next) => {
  Messages.find()
    .populate("author")
    .sort({ date: -1 })
    .exec((err, messages) => {
      if (err) {
        return next(err);
      }
      if (messages.length === 0) {
        res.render("index", {
          isEmpty: "the database not have messages stored",
        });
        return;
      }

      res.render("index", {
        messages: messages,
      });
    });
};
