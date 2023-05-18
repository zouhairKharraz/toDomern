const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
// require("dotenv").config();

const app = express();



var corsOptions = {
  origin:
    "http://host.docker.internal:6061"
};
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require("./app/routes/tutorial.routes")(app);

// set port, listen for requests
const PORT = 6061;
// const { NODE_LOCAL_PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
