const { app } = require("../app");
const User = require("../models/userModel");
const Exercise = require("../models/exerciseModel");

async function createUser(req, res) {
  // try {
  console.log("Creating User...");
  var { username } = req.body;

  const existingUser = await User.collection.findOne({ username: username });

  if (existingUser) {
    app.locals.userId = existingUser._id;
    res.json({
      username: existingUser.username,
      _id: existingUser._id,
    });
  } else {
    const newUser = await User.collection.insertOne({
      username,
    });

    console.log("New User Created");
    app.locals.userId = newUser.insertedId;

    res.json({
      username: username,
      _id: newUser.insertedId,
    });
  }
}

async function addExercise(req, res) {
  const { userId, description, duration, date } = req.body;
  console.log("Adding Exercise...", userId, description, duration, date);

  const [year, month, day] = date.split("-");
  const parsedDate = new Date(`${year}-${month}-${day}`);

  const newExercise = await Exercise.collection.insertOne({
    userId,
    description,
    duration: parseInt(duration),
    date: parsedDate.toDateString(),
  });

  console.log("New Exercise Created:", newExercise);

  const count = await Exercise.collection.countDocuments({ userId: userId });

  console.log("Exercise Count:", count);

  const myUser = await User.findById(userId);

  res.json({
    _id: myUser._id,
    username: myUser.username,
    count: count,
    log: {
      description: description,
      duration: parseInt(duration),
      date: parsedDate.toDateString(),
    },
  });
}

module.exports = {
  addExercise,
  createUser,
};
