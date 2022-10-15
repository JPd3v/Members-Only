var express = require("express");
var router = express.Router();

const user_controller = require("../controller/signUpController");
const getRole_controller = require("../controller/getRoleController");
const logIn_controller = require("../controller/logInController");
const createMessage_controller = require("../controller/createMessageController");
const index_controller = require("../controller/indexController");
const deleteMessage_controller = require("../controller/deleteMessageController");

router.get("/", index_controller.get_index);

// sing up routes
router.get("/sign-up", user_controller.user_create_get);
router.post("/sign-up", user_controller.user_create_post);

// log in routes
router.get("/log-in", logIn_controller.user_login_get);
router.post("/log-in", [
  logIn_controller.user_login_post,
  logIn_controller.user_login_auth,
]);

// log out route
router.get("/log-out", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// get-role routes
router.get("/get-role", getRole_controller.get_role_form_get);
router.post("/get-role", getRole_controller.get_role_form_post);

// create-message routes
router.get("/create-message", createMessage_controller.get_create_message_form);
router.post(
  "/create-message",
  createMessage_controller.post_create_message_form
);

// delete message route
router.post(
  "/delete-message",
  deleteMessage_controller.post_delete_message_form
);

module.exports = router;
