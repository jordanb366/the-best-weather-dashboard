var APIKey = "da554693696ba932dd638aef86b0e83e";
var userInput = document.querySelector("#user-input");
var cityBtn = document.querySelector("#cityBtn");
var citiesSearchedList = document.querySelector("#cities-searched-list");

var currentWeatherContainer = document.querySelector("#current-weather-container");
var fiveDayForecast = document.querySelector("#five-day-forecast");

let saveTheWeather = JSON.parse(localStorage.getItem("savedWeather") || "[]");



cityBtn.addEventListener("click", function(event){
    event.preventDefault
    if (userInput.value == false) {
      userInput.textContent = "Please enter a city!";
    } else {
  currentWeatherContainer.style.display = "block";
  fiveDayForecast.style.display = "flex";
   currentWeather(userInput.value);
  
   
   saveWeather();
  //  getWeather();
   showExistingCities();
   userInput.value = "";
    }
}); 


function currentWeather(city) {
  var lat;
  var lon;
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;
   

    fetch(apiUrl)
    .then(function (response) {
        return response.json();
     })
     .then(function (data) {
   console.log(data.dt);

  lat = data.coord.lat;
  lon.tested = data.coord.lon;
  

      var icon = document.createElement("img");
      
      var imgURL = "https://openweathermap.org/img/wn/"; 
      var cityName = document.createElement("h3");
      var cityTemp = document.createElement('p');
      var cityWind = document.createElement('p');
      var cityHumidity = document.createElement('p');
      var getIcons = imgURL + data.weather[0].icon + ".png";
      icon.src = getIcons;
      

     // Unix to calendar date
      var timeStamp = data.dt;
      var date = new Date(timeStamp * 1000);
      var actualDate = date.toLocaleString();

      var weatherDate = document.createElement("h4");
      weatherDate.textContent = actualDate;

      cityName.textContent = data.name;
      cityTemp.textContent = "Temp: " + data.main.temp + " degrees F";
      cityWind.textContent = "Wind: " + data.wind.speed + " MPH";
      cityHumidity = "Humidity: " + data.main.humidity + " %";

      currentWeatherContainer.innerHTML = "";
      currentWeatherContainer.append(icon);
      currentWeatherContainer.append(weatherDate)
      currentWeatherContainer.append(cityName);
      currentWeatherContainer.append(cityTemp);
      currentWeatherContainer.append(cityWind);
      currentWeatherContainer.append(cityHumidity);


      
      });

     console.log(lat);
     console.log(lon);

    var coordinatesUrl = "https://api.openweathermap.org/data/2.5/onecall?" +"lon=" + lon + "&lat=" + lat + "&units=imperial" + "&appid=" + APIKey;
   
      fetch(coordinatesUrl)
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
       

      });

      }
      





// Save to local storage
function saveWeather() {
    // Save related data as an object
    console.log(userInput.value);
    saveTheWeather.push(userInput.value);
    saveTheWeather = [...new Set(saveTheWeather)];

    console.log(saveTheWeather);
    // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
    localStorage.setItem("savedWeather", JSON.stringify(saveTheWeather));
  };

// Shows previous existing cities
function showExistingCities() {
  citiesSearchedList.innerHTML = "";

  for (let i = 0; i < saveTheWeather.length; i++) {
  var button = document.createElement("button");
    button.classList.add("btn", "btn-info", "btn-block", "test");
    button.textContent = saveTheWeather[i];
    citiesSearchedList.append(button);
    button.addEventListener("click", function(){
    currentWeather(saveTheWeather[i]);
    // weatherForeCast(saveTheWeather[i]);
    currentWeatherContainer.style.display = "block";
    fiveDayForecast.style.display = "flex";

  });
 } 
}
showExistingCities();

