const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.getSignIn = (req, res) => {

  if (req.isAuthenticated()) {
    return res.redirect("/user/userProfile");
  }
  return res.render("signIn", {
    title: "Sign In",
  });
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
  return res.render("signUp", {
    title: "Sign Up",
  });
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

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // console.log(req.body);
    return res.render("userProfile", {
      title: "User Profile",
      profile: user,
    });
  } catch {
    console.log("error in fetching user profile");
    return res.redirect("/");
  }
};

exports.getUpdateProfile = async (req, res) => {
  try {
    // return res.redirect("/");
    const user = await User.findById(req.params.id);
    // console.log(user.name);
    return res.render("updateProfile", {
      title: "Update Profile",
      profile: user,
    });
  } catch (error) {
    console.log("Error in fetching user profile");
    return res.redirect("/");
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    // Ensure the user is authorized to update the profile
    if (req.body._id === req.params.id) {
      const { name, password } = req.body;

      let hashedPassword = undefined;
      if (password) {
        const saltRounds = 10;
        hashedPassword = await bcrypt.hash(password, saltRounds);
      }

      const updateFields = {
        name,
      };

      if (hashedPassword) {
        updateFields.password = hashedPassword; // Add the hashed password only if it exists
      }

      await User.findByIdAndUpdate(req.params.id, updateFields);

      // Redirect to the profile page after a successful update
      return res.redirect("/user/profile/" + req.params.id);
    } else {
      return res.status(403).send("Unauthorized action.");
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res.status(500).redirect("/");
  }
};