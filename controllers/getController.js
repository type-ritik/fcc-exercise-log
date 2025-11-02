const User = require("../models/userModel");
const Exercise = require("../models/exerciseModel");
const { app } = require("../app");

async function showUser(req, res) {
  try {
    const id = app.locals.userId;
    if (!id) {
      const users = await User.find({});
      // console.log(Object(users));
      res.send(users);
    }
    console.log(id);
    const currentUser = await User.findById(id);
    app.locals.userId = undefined;
    res.json({
      username: currentUser.username,
      _id: currentUser._id,
    });
  } catch (err) {
    console.error("Server Error: ", err.message);
    throw new Error(`Server Error 505`, err.message);
  }
}

async function showExerciseLogs(req, res) {
  const userId = req.params._id;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const exercises = await Exercise.collection.find({ userId: userId });

  if (!exercises)
    return res.status(404).json({ error: "No exercises found for this user" });

  const log = await exercises.toArray();
  console.log(log);

  const formattedLog = log.map((exercise) => ({
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.date,
  }));

  console.log(formattedLog)

  res.json({
    _id: user._id,
    username: user.username,
    count: formattedLog.length,
    log: formattedLog,
  });
}

module.exports = {
  showUser,
  showExerciseLogs,
};
