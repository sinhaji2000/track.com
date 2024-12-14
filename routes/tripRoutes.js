const express = require("express");
const Router = express.Router();
const passport = require("../config/passportLocal");

const tripController = require("../controllers/tripController");

Router.get("/createTrip", tripController.getcreateTrip);
Router.post(
  "/createTrip",
  passport.checkAuthentication,
  tripController.postcreateTrip
);

module.exports = Router;
