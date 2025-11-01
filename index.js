const { express, app } = require("./app");
const cors = require("cors");
const bodyParser = require("body-parser");
const database = require("./db");
const postRoute = require("./routes/postRoute");
const getRoute = require("./routes/getRoute");

const PORT = 3000;

database._connect();
app.use(bodyParser.urlencoded({ extended: true }));
console.log("Connected to body parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ optionsSuccessStatus: 200 }));
console.log("Connected to proxy server test cases");

app.use(express.static("public"));

app.use("/api", postRoute);
app.use("/api", getRoute);

app.get("/", (req, res) => {
  console.log("Connected to home API");
  res.sendFile(__dirname + "/views/index.html");
});

app.listen(PORT, () => {
  console.log(`System is running on port :${PORT}`);
});
