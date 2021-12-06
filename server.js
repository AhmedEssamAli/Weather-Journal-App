// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server

PORT = 8000;

const server = app.listen(PORT, () => {
  console.log(`Server is up, listening on port ${PORT}`);
});

// ROUTES
// GET route "/data" to return data object
app.get("/data", (req, res) => {
  res.send(projectData);
});

// POST route "/addEntry" to save Data in the object with keys and return response with the data object
app.post("/addEntry", (req, res) => {
  const { temperature, date, userResponse } = req.body;
  projectData["temp"] = temperature;
  projectData["date"] = date;
  projectData["content"] = userResponse;
  res.send(projectData);
});
