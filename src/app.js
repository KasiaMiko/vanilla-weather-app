function formatDay(timestamp) {
    let date= new Date(timestamp);
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      let day= days[date.getDay()];
      return `${day}`;
  }
function formatTime(timestamp) {
    let date= new Date(timestamp);
    let hour= date.getHours();
    if (hour <10){
    hour=`0${hour}`;
}
    let minutes= date.getMinutes();
    if (minutes <10){
    minutes=`0${minutes}`;
}
      return `${hour}:${minutes}`;
  }

  
  function displayVariables(response) {
      let temperatureElement= document.querySelector("#temp");
      let cityElement= document.querySelector("#city");
      let windElement= document.querySelector("#wind");
      let conditionElement= document.querySelector("#condition");
      let dayElement= document.querySelector("#day");
      let timeElement= document.querySelector("#time");
      let iconElement= document.querySelector("#icon");

      celsiusTemperature=response.data.main.temp;

      temperatureElement.innerHTML=Math.round(response.data.main.temp);
      cityElement.innerHTML=response.data.name;
      windElement.innerHTML=response.data.wind.speed;
      conditionElement.innerHTML=response.data.weather[0].description;
      dayElement.innerHTML=formatDay(response.data.dt * 1000);
      timeElement.innerHTML=formatTime(response.data.dt * 1000);
      iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
      iconElement.setAttribute("alt", response.data.weather[0].description);
  }

function displayForecast(response){
    let forecastElement=document.querySelector("#forecast");
    forecastElement.innerHTML=null;
    let forecast=null;

    for (let index=0; index<6; index++) {
        forecast= response.data.list[index];
        forecastElement.innerHTML +=`
        <div class="col-2">
        <div class="card-body">
        <h4 class="forecastIcon"> <img
        src="http://openweathermap.org/img/wn/${forecast.weather[0].icon
        }@2x.png"/> </h4>
        <h5 class="forecastDay">${formatTime(forecast.dt * 1000)}</h5>
        <h5 class="forecastTemp">${Math.round(forecast.main.temp)}° C </h5>
        </div>
        </div>`;
    }
}

function search (city){
    let apiKey = "cac6eb1808e7ad8b2e537949ab1a8c09";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayVariables);

  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

  function handleSubmit(event){
    event.preventDefault();
    let cityInputElement=document.querySelector("#search-text-input");
    search(cityInputElement.value);
}


function currentLocation(){
   function getPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "cac6eb1808e7ad8b2e537949ab1a8c09";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayVariables);

    apiUrl= `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}
   navigator.geolocation.getCurrentPosition(getPosition);
 }
function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature=null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("button");
currentButton.addEventListener("click", currentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

search("Wroclaw");