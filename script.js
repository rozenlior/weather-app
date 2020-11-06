//Challenge 1: Display current date and time
//h2
function formatDate(date) {
  
let hour = date.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];

return `${day}, ${hour}:${minutes}`;

}

let dateElement = document.querySelector("#date");
let currentTime = new Date();

dateElement.innerHTML = formatDate(currentTime);

//Challenge 2: Add a search engine, when searching for a city, display the city name on the page after user submits form.
// form class: #search-form
//input id: #city-input-form


function displayWeatherCondition(response) {
 
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML= Math.round(response.data.main.temp);
  document.querySelector("#temp-description").innerHTML=response.data.weather[0].main;
  document.querySelector("#low-temp").innerHTML= Math.round(response.data.main.temp_min);
    document.querySelector("#high-temp").innerHTML= Math.round(response.data.main.temp_max);
console.log(response.data);
}



function searchCity(event) {
  event.preventDefault();
  let apiKey ="958b71e38c385a4f0896342006026aa2";
  let city = document.querySelector("#city-input-form").value;
let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayWeatherCondition);
//make an API call to OpenWeather API
//Once i get the http response, we display the city name and temp
}

let form= document.querySelector(".search-form");
form.addEventListener("submit", searchCity);



