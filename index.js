const express = require("express");
const port = 3000;
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passportLocal");
const User = require("./models/user");

const MongoStore = require("connect-mongo");

// app.use(expressLayouts);
app.use(cookieParser());

// Use body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// importing routes
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use(
  session({
    name: "Track.com",
    secret: "blabla",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100, // Setting cookie expiration
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/mangment", // Use the connection string
      // mongooseConnection : db ,
      autoRemove: "disabled", // Optional: specify to disable auto removal
    }),
  })
);

// Initialize Passport and session handling
app.use(passport.initialize());
app.use(passport.session());
app.use(passportLocal.setAuthenticatedUser);

// using routes
app.use(dashboardRoutes);
app.use("/user", require("./routes/userRoutes"));
app.use("/trip", require("./routes/tripRoutes"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
