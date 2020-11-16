function formatDate(date, timezone) {
  let localOffsetInMs = date.getTimezoneOffset() * 60 * 1000;
  let targetOffsetInMs = timezone * 1000;
  let targetTimestamp = date.getTime() + localOffsetInMs + targetOffsetInMs;
  let localDate = new Date(targetTimestamp);

  let hours = localDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = localDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = localDate.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];
  return `${day}, ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#current-temp");
  let descriptionElement = document.querySelector("#temp-description");
  let lowElement = document.querySelector("#low-temp");
  let highElement = document.querySelector("#high-temp");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#weather-icon");
  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].main;
  lowElement.innerHTML = Math.round(response.data.main.temp_min);
  highElement.innerHTML = Math.round(response.data.main.temp_max);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  dateElement.innerHTML = formatDate(new Date(), response.data.timezone);
  iconElement.setAttribute("alt", response.data.weather[0].main);
  iconElement.setAttribute(
    "src",
    `src/img/${response.data.weather[0].icon}.png`
  );

  celsiusTemperature = response.data.main.temp;
  lowTemp = response.data.main.temp_min;
  highTemp = response.data.main.temp_max;

  document.querySelector("#weather-icon").src =
    "src/img/" + response.data.weather[0].icon + ".png";
}

function displayExtraConditions(response) {
  let airQualityElement = document.querySelector("#air-quality");
  let airIndex = response.data.data[0].aqi;
  let airDesc = "";

  if (airIndex >= 301) {
    airDesc = `Hazardous (${airIndex})`;
  } else if ((airIndex >= 201) & (airIndex < 301)) {
    airDesc = `Very Unhealthy (${airIndex})`;
  } else if ((airIndex >= 101) & (airIndex < 201)) {
    airDesc = `Unhealthy (${airIndex})`;
  } else if ((airIndex >= 51) & (airIndex < 101)) {
    airDesc = `Moderate (${airIndex})`;
  } else if ((airIndex >= 0) & (airIndex < 51)) {
    airDesc = `Good (${airIndex})`;
  }
  airQualityElement.innerHTML = airDesc;
}

function displayForecast (response){
  console.log(response.data);
}




function search(city) {
  let apiKey = "958b71e38c385a4f0896342006026aa2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  let apiKeyTwo = "a4e05904d8474359854ef52b8478450f";
  let apiUrlTwo = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKeyTwo}&units=metric`;
  axios.get(apiUrlTwo).then(displayExtraConditions);

 let apiUrlThree = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${apiKeyTwo}&units=metric`;
  axios.get(apiUrlThree).then(displayForecast);
}

// form
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input-form");
  search(cityInputElement.value);
}
//Temperature Conversion Functions
function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#low-temp").innerHTML = Math.round(lowTemp);
  document.querySelector("#high-temp").innerHTML = Math.round(highTemp);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemperature);
  document.querySelector("#low-temp").innerHTML = Math.round(
    (lowTemp * 9) / 5 + 32
  );
  document.querySelector("#high-temp").innerHTML = Math.round(
    (highTemp * 9) / 5 + 32
  );
}

//Event Listeners
let form = document.querySelector(".search-form");
form.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

search("Los Angeles");
