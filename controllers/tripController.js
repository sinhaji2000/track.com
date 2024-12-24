const Trip = require("../models/tripModel");
const User = require("../models/user");



exports.getcreateTrip = async (req, res) => {
  return res.render("createTrip", {
    title: "createTrip",
  });
};

exports.postcreateTrip = async (req, res) => {
  try {
    const { tripTitle, date, expenses, participants } = req.body;

    const userId = req.user._id;

    if (!Array.isArray(expenses) || !Array.isArray(participants)) {
      return res.status(400).send("Expenses and participants must be arrays");
    }

    const trip = await Trip.create({
      tripTitle,
      date,
      expenses: expenses.map((expense) => ({
        title: expense.title,
        amount: expense.amount,
      })),
      participants: participants.map((participant) => ({
        email: participant.email,
        amount: participant.amount,
      })),
      createdBy: req.user._id,
    });

    await User.findByIdAndUpdate(userId, { $push: { trips: trip._id } });

    // return res.status(201).json({ message: "Trip created successfully", trip })
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error creating trip");
  }
};
exports.getUpdateTrip = async (req, res) => {
  const tripId = req.params.id;
  const trip = await Trip.findById(tripId);

  return res.render("updateTrip", {
    trip: trip,
    title: "updateTrip",
  });
};
exports.postUpdateTrip = async (req, res) => {
  try {
    const tripId = req.params.id;
    const { tripTitle, expenses, participants } = req.body;

    const userId = req.user._id;

    if (!Array.isArray(expenses) || !Array.isArray(participants)) {
      return res.status(400).send("Expenses and participants must be arrays");
    }

    const trip = await Trip.findByIdAndUpdate(tripId, {
      tripTitle: tripTitle,
      expenses: expenses.map((expense) => ({
        title: expense.title,
        amount: expense.amount,
      })),
      participants: participants.map((participant) => ({
        email: participant.email,
        amount: participant.amount,
      })),
    });

    return res.status(200).redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error updating trip");
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    const tripId = req.params.id;

    // Find the trip by ID
    const trip = await Trip.findById(tripId);

    // Check if the trip exists
    if (!trip) {
      return res.status(404).send("Trip not found");
    }

    // Check if the user is the creator of the trip
    if (trip.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).send("You are not authorized to delete this trip");
    }

    // Delete the trip
    await Trip.findByIdAndDelete(tripId);

    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error deleting trip");
  }
};

