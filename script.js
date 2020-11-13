function formatDate(timestamp) {
  let date= new Date(timestamp);
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


function displayWeatherCondition(response) {
  let cityElement=document.querySelector("#city");
  let tempElement=document.querySelector("#current-temp");
  let descriptionElement= document.querySelector("#temp-description");
  let lowElement=document.querySelector("#low-temp");
  let highElement=document.querySelector("#high-temp");
  let windElement=document.querySelector("#wind");
  let humidityElement=document.querySelector("#humidity");
  let dateElement=document.querySelector("#date");
  let iconElement=document.querySelector("#weather-icon");
   cityElement.innerHTML = response.data.name;
   tempElement.innerHTML= Math.round(response.data.main.temp);
   descriptionElement.innerHTML=response.data.weather[0].main;
   lowElement.innerHTML= Math.round(response.data.main.temp_min);
   highElement.innerHTML= Math.round(response.data.main.temp_max);
   windElement.innerHTML= Math.round(response.data.wind.speed);
   humidityElement.innerHTML= response.data.main.humidity;
   dateElement.innerHTML = formatDate(response.data.dt * 1000);
   iconElement.setAttribute("alt", response.data.weather[0].main);
   iconElement.setAttribute("src", `src/img/${response.data.weather[0].icon}.png`);

   document.querySelector("#weather-icon").src = "src/img/" + response.data.weather[0].icon + ".png";

   console.log(response.data);
}


function searchCity(event) {
  event.preventDefault();
  let apiKey ="958b71e38c385a4f0896342006026aa2";
  let city = document.querySelector("#city-input-form").value;
  let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayWeatherCondition);

}

let form= document.querySelector(".search-form");
form.addEventListener("submit", searchCity);



