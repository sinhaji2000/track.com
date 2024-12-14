const express = require("express");
const Routes = express;
const router = Routes.Router();

const dashBoardController = require("../controllers/dashBoardController");

router.get("/", dashBoardController.getDashboard);

module.exports = router;
