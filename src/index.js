//update weather data in realtime
function updateWeatherData(response) {
  let temperatureElement = document.querySelector("#weather-app-temp-value");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let conditionDescriptionElement = document.querySelector(
    "#condition-description"
  );
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  conditionDescriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      class="weather-app-icon"/>`;
}

//function for date
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

//make api call and update temperature interface
function searchCity(city) {
  let apiKey = "7feob78d78cbdf431afd487b07c045tb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateWeatherData);
}

//change city to the search city
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

//function for weather forecast
function displayForecast() {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="forecast-preview">
        <div class="forecast-day"> ${day} </div>
        <div class="forecast-emoji"> ☀️ </div>
        <div class="forecast-temp"> 
          <span class="forecast-high-temp"> 20° </span> 
          <span class="forecast-low-temp"> 14° </span> 
        </div>
      </div>
      `;
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

searchCity("Seattle");
displayForecast();
