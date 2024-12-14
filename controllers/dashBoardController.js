const User = require("../models/user");

exports.getDashboard = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).populate("trips");

  return res.render("dashboard", { user });
};
