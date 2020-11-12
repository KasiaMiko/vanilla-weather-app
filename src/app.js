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
      let windElement= document.querySelector("#wind")
      let conditionElement= document.querySelector("#condition")
      let dayElement= document.querySelector("#day")
      let timeElement= document.querySelector("#time")
      temperatureElement.innerHTML=Math.round(response.data.main.temp);
      cityElement.innerHTML=response.data.name;
      windElement.innerHTML=response.data.wind.speed;
      conditionElement.innerHTML=response.data.weather[0].description;
      dayElement.innerHTML=formatDay(response.data.dt * 1000);
      timeElement.innerHTML=formatTime(response.data.dt * 1000);
  }

  let apiKey = "cac6eb1808e7ad8b2e537949ab1a8c09";
  let city = "Berlin"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayVariables);