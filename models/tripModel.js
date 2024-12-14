const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  tripTitle: {
    type: String,
    required: true,
  },

  expenses: [
    {
      title: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  participants: [
    {
      email: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Trip = mongoose.model("Trip", TripSchema);
module.exports = Trip;
