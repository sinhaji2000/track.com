const express = require("express");
const Router = express.Router();
const passport = require("../config/passportLocal");

const userController = require("../controllers/userController");
const tripController = require("../controllers/tripController");

Router.get("/signIn", passport.isAuthenticated, userController.getSignIn);
Router.post(
  "/signIn",
  passport.authenticate("local", { failureRedirect: "/user/signIn" }),
  userController.postSignIn
);

Router.get("/signUp", passport.isAuthenticated, userController.getSignUp);
Router.post("/signup", userController.postSignUp);

Router.get(
  "/profile/:id",
  passport.checkAuthentication,

  userController.getUserProfile
);
Router.get(
  "/updateProfile/:id",
  passport.checkAuthentication,
  userController.getUpdateProfile
);
Router.post(
  "/updateProfile/:id",
  passport.checkAuthentication,
  userController.updateUserProfile
);


module.exports = Router;
