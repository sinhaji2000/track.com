const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  DOB: {
    type: Date,
    // required: true,
  },
  password: {
    type: String,
    required: true,
  },
  trips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
