const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.getSignIn = (req, res) => {
  return res.render("signIn");
};

exports.postSignIn = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  // const { email, password } = req.body;
  // console.log(email, password, "mukesh");
  return res.redirect("/");
};
exports.getSignUp = (req, res) => {
  return res.render("signUp");
};
exports.postSignUp = async (req, res) => {
  try {
    const { name, email, DOB, password } = req.body;

    const isUserExists = await User.findOne({ email: email });

    if (isUserExists) {
      console.log("User already exists");
      return res.redirect("/user/signIn");
    }

    const saltRounds = 10; // Define the cost factor for hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      DOB: DOB,
    });

    console.log(user);
    return res.redirect("/user/signIn"); // Redirect to signIn after signUp
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error creating user");
  }
};
