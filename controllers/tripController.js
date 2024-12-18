const Trip = require("../models/tripModel");
const User = require("../models/user");



exports.getcreateTrip = async (req, res) => {
  return res.render("createTrip");
};

exports.postcreateTrip = async (req, res) => {
  try {
    const { tripTitle, expenses, participants } = req.body;
    const userId = req.user._id;

    if (!Array.isArray(expenses) || !Array.isArray(participants)) {
      return res.status(400).send("Expenses and participants must be arrays");
    }

    const trip = await Trip.create({
      tripTitle,
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
