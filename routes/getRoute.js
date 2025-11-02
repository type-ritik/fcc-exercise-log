const { route } = require("../app");
const { showUser, showExerciseLogs } = require("../controllers/getController");

module.exports = route.get("/users", showUser);
module.exports = route.get("/users/:_id/exercises", showExerciseLogs);
