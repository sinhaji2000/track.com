const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/user");
// console.log("mukesh");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      console.log("Inside strategy function"); // Log here
      try {
        // Find the user by email

        const user = await User.findOne({ email });

        // Check if the user exists and if the password matches

        if (!user) {
          console.log("Invalid username or password");
          return done(null, false); // User not found
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          console.log("Invalid username or password");
          return done(null, false); // Invalid password
        }

        // If valid user, return the user
        return done(null, user);
      } catch (err) {
        // Handle any errors that occurred during the database lookup
        console.log(err);
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializing the user from the key in the cookie
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    if (user) {
      return done(null, user);
    }
  } catch (error) {
    console.log(error);
    return done(error);
  }
});

// Check if the user is authenticated

passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  // If user is not signed in
  return res.redirect("/user/signIn");
};

passport.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // If the user is already logged in, redirect them to the home route
    return res.redirect("/");
  }
  // If not logged in, proceed to the requested route
  next();
};

// Set authenticated user in response locals
passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
