var APIKey = "da554693696ba932dd638aef86b0e83e";
var userInput = document.querySelector("#user-input");
var cityBtn = document.querySelector("#cityBtn");
var citiesSearchedList = document.querySelector("#cities-searched-list");

var currentWeatherContainer = document.querySelector("#current-weather-container");
var fiveDayForecast = document.querySelector("#five-day-forecast");

var saveTheWeather = [];

   

cityBtn.addEventListener("click", function(event){
    event.preventDefault
    if (userInput.value == false) {
      userInput.textContent = "Please enter a city!";
    } else {
   currentWeather();
   weatherForeCast();
   showCitiesSearched();
   saveWeather();
   getWeather();
   userInput.value = "";
    }
   
}); 



function currentWeather() {
  var city = userInput.value;
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;
   
    fetch(apiUrl)
    .then(function (response) {
        return response.json();
     })
     .then(function (data) {
     //Using console.log to examine the data
     console.log(data);

  
      console.log(data.name);
      console.log("Temp: " + data.main.temp + " degrees F");
      console.log("Wind: " + data.wind.speed + " MPH");
      console.log("Humidity: " + data.main.humidity + " %");
   
      var cityName = document.createElement("h3");
      var cityTemp = document.createElement('p');
      var cityWind = document.createElement('p');
      var cityHumidity = document.createElement('p');

      cityName.textContent = data.name;
      cityTemp.textContent = "Temp: " + data.main.temp + " degrees F";
      cityWind.textContent = "Wind: " + data.wind.speed + " MPH";
      cityHumidity = "Humidity: " + data.main.humidity + " %";

      currentWeatherContainer.innerHTML = "";

      currentWeatherContainer.append(cityName);
      currentWeatherContainer.append(cityTemp);
      currentWeatherContainer.append(cityWind);
      currentWeatherContainer.append(cityHumidity);

      });
}

function weatherForeCast() {
var city = userInput.value;


var secondApiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=5" + "&units=imperial" + "&appid=" + APIKey;
fetch(secondApiUrl)
.then(function (response) {
    return response.json();
 })
 .then(function (data) {
//     //Using console.log to examine the data
 console.log(data);
  
  for (var i = 0; i < data.list.length; i++) {
    
      console.log("Temp: " + data.list[i].main.temp + " degrees F");

      console.log(data.list[i].main.temp);
      
      

      var forecastCards = document.querySelectorAll(".card")[i];
      var tempNow = document.createElement("p");
      var windNow = document.createElement("p");
      var humidityNow = document.createElement("p");

      forecastCards.innerHTML = "";

      

      tempNow.textContent = "Temp: " + data.list[i].main.temp + " degrees F";
      windNow.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
      humidityNow.textContent = "Humidity: " + data.list[i].main.humidity + " %";

      console.log(tempNow);
      forecastCards.append(tempNow);
      forecastCards.append(windNow);
      forecastCards.append(humidityNow);   
    }
  });
}


function showCitiesSearched() {
  if (userInput.value == false) {
    
  } else {
    var button = document.createElement("button");
    previousCity = userInput.value;
    button.classList.add("btn", "btn-info", "btn-block", "test");
    button.textContent = previousCity;
    citiesSearchedList.append(button);
    console.log(button.value);
  }
}






// Save to local storage
function saveWeather() {
    // Save related form data as an object
    
    console.log(userInput.value);
    saveTheWeather.push(userInput.value);
    uniqWeather = [...new Set(saveTheWeather)];

    console.log(saveTheWeather);

    
    
    // var savedWeather = {
    //     userInput: userInput.value
        

    // };
    // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
    localStorage.setItem("savedWeather", JSON.stringify(uniqWeather));
  
  };

// Get from local storage
function getWeather() {
// Use JSON.parse() to convert text to JavaScript object
    var grabSaveWeather = JSON.parse(localStorage.getItem("savedWeather"));
    

    for (var i = 0; i < grabSaveWeather.length; i++) {
      saveTheWeather.push(grabSaveWeather[i]);
    }
    console.log(grabSaveWeather);
}

getWeather();


function showExistingCities() {
 for (var i = 0; i < saveTheWeather.length; i++) {
  var button = document.createElement("button");
    button.classList.add("btn", "btn-info", "btn-block", "test");
    button.textContent = saveTheWeather[i];
    citiesSearchedList.append(button);

 }
    
  
}

showExistingCities();