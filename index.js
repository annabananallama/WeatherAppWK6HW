function formatDate() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const now = new Date();
  const currentDayOfWeek = daysOfWeek[now.getDay()];
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  let h4 = document.querySelector("h4");

  h4.innerHTML = `${currentDayOfWeek} ${hours}:${minutes}`;
}

formatDate();

function currentPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  let apiKey = "16c0c42e9a748ab88f78a65c6f902070";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);

  let cityName = document.querySelector("#cityName");
  cityName.innerHTML = `${city}`;

  let currentTemperature = document.querySelector(".current-temp");
  currentTemperature.innerHTML = `<strong>Temperature:</strong></br> ${temperature}°C`;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentLocationButton = document.querySelector(".currentLocation");
currentLocationButton.addEventListener("click", getCurrentPosition);

function getWeatherData(city) {
  let apiKey = "16c0c42e9a748ab88f78a65c6f902070";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeatherData);
}

function displayWeatherData(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);

  let cityNameElement = document.getElementById("cityName");
  let temperatureElement = document.querySelector(".current-temp");

  cityNameElement.innerHTML = city;
  temperatureElement.innerHTML = `<strong>Temperature:</strong> ${temperature}°C`;
}

let enterButton = document.getElementById("enterButton");
let locationInput = document.getElementById("locationInput");

enterButton.addEventListener("click", function (event) {
  event.preventDefault();
  let city = locationInput.value.trim();
  getWeatherData(city);
});

locationInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    let city = locationInput.value.trim();
    getWeatherData(city);
  }
});
