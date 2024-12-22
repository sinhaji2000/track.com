const User = require("../models/user");

exports.getDashboard = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const user = await User.findById(req.user.id);

      return res.render("dashboard", {
        title: "Dashboard",
        user: user,
      });
    } else {
      return res.redirect("/user/signIn");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error in fetching dashboard");
  }
};
