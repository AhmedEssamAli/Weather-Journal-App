/* Global Variables */
const API_KEY = "7493088841fd29c74419235a2fac14a3";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Function: Getting use response on the feeling
const getUserResponse = () => {
  const feelingField = document.getElementById("feelings");
  return feelingField.value;
};

// Async function: getting data from "OpenWeatherMapAPI"
// chaining another async function to POST data to the server
// chaining another async function to update returned data from server on the UI
const getWeatherData = async (zipcode) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${API_KEY}`;
  const data = await fetch(url);

  const weatherData = await data.json();
  const dataObj = {
    temperature: weatherData.main.temp,
    date: newDate,
    userResponse: getUserResponse(),
  };
  let returnedData = await saveData("/addEntry", dataObj);
  updateUI(returnedData);
};

// Async function to POST data object to the server
const saveData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    let newData = await response.json();
    return newData;
  } catch (error) {
    console.error("error", error);
  }
};

// Async function to update the UI with returned data from server
const updateUI = async (data) => {
  const dateField = document.getElementById("date");
  const tempField = document.getElementById("temp");
  const contentField = document.getElementById("content");

  dateField.textContent = `Date: ${data.date}`;
  tempField.textContent = `Temperature: ${data.temp}`;
  contentField.textContent = `Today's Feeling: ${data.content}`;
};

// getting UI elements
const zipField = document.getElementById("zip");
const generateBtn = document.getElementById("generate");

// Eventlistener to trigger on click to run the async functions
generateBtn.addEventListener("click", () => {
  let zipCode = zipField.value;
  getWeatherData(zipCode);
});
