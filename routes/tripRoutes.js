const express = require("express");
const Router = express.Router();
const passport = require("../config/passportLocal");
const Trip = require("../models/tripModel");

const tripController = require("../controllers/tripController");

Router.get("/", (req, res) => {
  res.send("Welcome to trip page");
});

Router.get("/createTrip", tripController.getcreateTrip);
Router.post(
  "/createTrip",
  passport.checkAuthentication,
  tripController.postcreateTrip
);
Router.get("/updateTrip/:id", tripController.getUpdateTrip);
Router.post(
  "/updateTrip/:id",
  passport.checkAuthentication,
  tripController.postUpdateTrip
);

Router.post(
  "/deleteTrip/:id",
  passport.checkAuthentication,
  tripController.deleteTrip
);
Router.get("/tripDetails/:id", tripController.getTripInfo);
module.exports = Router;
