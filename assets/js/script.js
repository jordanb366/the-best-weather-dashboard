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
   weatherForeCast(userInput.value);
   
   saveWeather();
  //  getWeather();
   showExistingCities();
   userInput.value = "";
    }
   
}); 



function currentWeather(city) {
  
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;
   
    fetch(apiUrl)
    .then(function (response) {
        return response.json();
     })
     .then(function (data) {
   

  
      
      var icon = document.createElement("img");
      
      var imgURL = "https://openweathermap.org/img/wn/"; 
      var cityName = document.createElement("h3");
      var cityTemp = document.createElement('p');
      var cityWind = document.createElement('p');
      var cityHumidity = document.createElement('p');
      var getIcons = imgURL + data.weather[0].icon + ".png";
      icon.src = getIcons;
      
      cityName.textContent = data.name;
      cityTemp.textContent = "Temp: " + data.main.temp + " degrees F";
      cityWind.textContent = "Wind: " + data.wind.speed + " MPH";
      cityHumidity = "Humidity: " + data.main.humidity + " %";

      currentWeatherContainer.innerHTML = "";
      currentWeatherContainer.append(icon);
      currentWeatherContainer.append(cityName);
      currentWeatherContainer.append(cityTemp);
      currentWeatherContainer.append(cityWind);
      currentWeatherContainer.append(cityHumidity);

      });
}

function weatherForeCast(city) {



var secondApiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=5" + "&units=imperial" + "&appid=" + APIKey;
fetch(secondApiUrl)
.then(function (response) {
    return response.json();
 })
 .then(function (data) {

  
  for (var i = 0; i < data.list.length; i++) {
    
      

      var forecastCards = document.querySelectorAll(".card")[i];
      // var weatherDate = document.createElement("p");
      var icon = document.createElement("img");
      
      var imgURL = "https://openweathermap.org/img/wn/";
      var getIcons = imgURL + data.list[i].weather[0].icon + ".png";
    
      var tempNow = document.createElement("p");
      var windNow = document.createElement("p");
      var humidityNow = document.createElement("p");

// Get the date -- not working yet
      // var timeStamp = data.list[i].dt;
      // var date = new Date(timeStamp);
      // var actualDate = date.getDate()+"/"+ (date.getMonth()+1)+"/"+date.getFullYear();

      // console.log(data.list[i].weather[0].icon);

      // console.log(data.list[i].dt);
      // console.log(actualDate);
      forecastCards.innerHTML = "";
    
      // weatherDate.textContent = actualDate; 
      icon.src = getIcons;
      tempNow.textContent = "Temp: " + data.list[i].main.temp + " degrees F";
      windNow.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
      humidityNow.textContent = "Humidity: " + data.list[i].main.humidity + " %";

      console.log(tempNow);
      // forecastCards.append(weatherDate);
      forecastCards.append(icon);
      forecastCards.append(tempNow);
      forecastCards.append(windNow);
      forecastCards.append(humidityNow);   
    }
  });
}



// Save to local storage
function saveWeather() {
    // Save related form data as an object
    
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
    weatherForeCast(saveTheWeather[i]);
    currentWeatherContainer.style.display = "block";
    fiveDayForecast.style.display = "flex";
  
  });
 } 
}


showExistingCities();


//  for (var i = 0; i < saveTheWeather.length; i++) {
//   function saveI(i) {

  
//   var button = document.createElement("button");
//     button.classList.add("btn", "btn-info", "btn-block", "test");
//     button.textContent = saveTheWeather[i];
//     citiesSearchedList.append(button);
//   button.addEventListener("click", function(){
//     currentWeather(saveTheWeather[i]);
//     weatherForeCast(saveTheWeather[i]);
//   });
// } saveI(i)
//  } 
