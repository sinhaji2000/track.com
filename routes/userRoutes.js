const express = require("express");
const Router = express.Router();
const userController = require("../controllers/userController");
const passport = require("../config/passportLocal");

Router.get("/signIn", passport.isAuthenticated, userController.getSignIn);
Router.post(
  "/signIn",
  passport.authenticate("local", { failureRedirect: "/user/signIn" }),
  userController.postSignIn
);

Router.get("/signUp", passport.isAuthenticated, userController.getSignUp);
Router.post("/signup", userController.postSignUp);

module.exports = Router;
