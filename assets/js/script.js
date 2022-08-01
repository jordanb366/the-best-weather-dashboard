// Declared global variables
// API Key
var APIKey = "da554693696ba932dd638aef86b0e83e";
// Declares HTML elements that are IDs
var userInput = document.querySelector("#user-input");
var cityBtn = document.querySelector("#cityBtn");
var citiesSearchedList = document.querySelector("#cities-searched-list");
var currentWeatherContainer = document.querySelector("#current-weather-container");
var fiveDayForecast = document.querySelector("#five-day-forecast");

// Declares the saveTheWeather variable
let saveTheWeather = JSON.parse(localStorage.getItem("savedWeather") || "[]");


// Event listener for search "cityBtn"
cityBtn.addEventListener("click", function(event){
  // Prevents default so page does not refresh when the search button is clicked
    event.preventDefault();
    // If statement so that if there is no user input it won't run
    if (userInput.value == false) {
      userInput.textContent = "Please enter a city!";
    } else {
  // Else the content will run
  // Will display each HTML element for the sections current weather and five day forecast
  currentWeatherContainer.style.display = "block";
  fiveDayForecast.style.display = "flex";
  // Sets userInput.value to used in the api URL in the renderTheWeatherFunction
   renderTheWeather(userInput.value); 
  //  Calls saveWeather and show Exisiting Cities functions
   saveWeather();
   showExistingCities();
  //  Resets user input value to blank string
   userInput.value = "";
    }
}); 



// Function that calls and then renders the weather from the weather API
function renderTheWeather(city) {
  //Makes variables defined
  var lat;
  var lon;

  // Declares first API URL
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;
   
// Fetchs the API
    fetch(apiUrl)
    .then(function (response) {
        return response.json();
     })
     .then(function (data) {
   
      // Saves the lat and lon from the first API data into variable lat and lon
  lat = data.coord.lat;
  lon = data.coord.lon;
 
// Renders the current weather and declares the variables
      var icon = document.createElement("img");
      
      // Image URL for icones
      var imgURL = "https://openweathermap.org/img/wn/"; 

      // Declaring variables to create elements for the page
      var cityName = document.createElement("h3");
      var cityTemp = document.createElement("p");
      var cityWind = document.createElement("p");
      var cityHumidity = document.createElement("p");

      // Declaring variable to get the data for the icons
      var getIcons = imgURL + data.weather[0].icon + ".png";
      icon.src = getIcons;
      

     // Unix to calendar date for current weather
      var timeStamp = data.dt;
      var date = new Date(timeStamp * 1000);
      var actualDate = date.toLocaleDateString();

      var weatherDate = document.createElement("h4");
      weatherDate.textContent = actualDate;

      // Sets the text content for the element variables
      cityName.textContent = data.name;
      cityTemp.textContent = "Temp: " + data.main.temp + " degrees F";
      cityWind.textContent = "Wind: " + data.wind.speed + " MPH";
      cityHumidity.textContent = "Humidity: " + data.main.humidity + " %";

      // Sets the inner HTML on current weather section to be blank before rendering new content to the page
      currentWeatherContainer.innerHTML = "";

      // Appends the elements to the page
      currentWeatherContainer.append(icon);
      currentWeatherContainer.append(weatherDate)
      currentWeatherContainer.append(cityName);
      currentWeatherContainer.append(cityTemp);
      currentWeatherContainer.append(cityWind);
      currentWeatherContainer.append(cityHumidity);
      
      
    //Calls the weather from city and uses lon and lat to render weather
    // Declares the coordinates URL
     var coordinatesUrl = "https://api.openweathermap.org/data/2.5/onecall?" +"lon=" + lon + "&lat=" + lat + "&units=imperial" + "&appid=" + APIKey;
    
    //  Calls the the API and returns the data
       fetch(coordinatesUrl)
       .then(function (response) {
          return response.json();
       })
       .then(function (data) {
        
           // UV index for current day weather
           var uvIndex = document.createElement("p");
           uvIndex.textContent = "UV Index: " + data.current.uvi;
        
           // Adds color indication for UV conditions
           if (data.current.uvi < 2 ) {
             uvIndex.classList.add("uv-favorable-conditions");
           } else if (data.current.uvi >= 2 && data.current.uvi <= 5) {
             uvIndex.classList.add("uv-moderate-conditions");
           } else {
             uvIndex.classList.add("uv-severe-conditions");
           }
           // Appends UV index to current weather container
          currentWeatherContainer.append(uvIndex);
        
          // For loop for the daily weather, loops a total of five times to get 5 days 
          for (var i = 0; i < 5; i++) {
            
        // Declaring variables for elements
              var forecastCards = document.querySelectorAll(".card")[i];
              var weatherDate = document.createElement("p");
              var icon = document.createElement("img");
              
              // Gets weather image icon
              var imgURL = "https://openweathermap.org/img/wn/";
              var getIcons = imgURL + data.daily[i].weather[0].icon + ".png";
            
              var tempNow = document.createElement("p");
              var windNow = document.createElement("p");
              var humidityNow = document.createElement("p");
        
        // Get the date from unix time stamp to calendar date
              var timeStamp = data.daily[i].dt;
              var date = new Date(timeStamp * 1000);
              var actualDate = date.toLocaleDateString();
        
            //  Sets the inner HTML on the forecast cards to empty and then appends the data to the page
              forecastCards.innerHTML = "";
            
              // Sets text content of each element being created
              weatherDate.textContent = actualDate; 
              icon.src = getIcons;
              tempNow.textContent = "Temp: " + data.daily[i].temp.day + " degrees F";
              windNow.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
              humidityNow.textContent = "Humidity: " + data.daily[i].humidity + " %";

        // Appends the elements to the forecast Cards sections
              forecastCards.append(weatherDate);
              forecastCards.append(icon);
              forecastCards.append(tempNow);
              forecastCards.append(windNow);
              forecastCards.append(humidityNow);   
            }
        });
      });
    }
      

// Save to local storage function
function saveWeather() {
    // Save related data as an object
    saveTheWeather.push(userInput.value);
    saveTheWeather = [...new Set(saveTheWeather)];

    // Uses .setItem() to store object in storage and JSON.stringify to convert it as a string
    localStorage.setItem("savedWeather", JSON.stringify(saveTheWeather));
  };

// Shows previous existing cities
function showExistingCities() {
  citiesSearchedList.innerHTML = "";
// For loop over saveTheWeather localStorage and then appends buttons to "Search History"
  for (let i = 0; i < saveTheWeather.length; i++) {

    var button = document.createElement("button");
      button.classList.add("btn", "btn-info", "btn-block");
      button.textContent = saveTheWeather[i];
      citiesSearchedList.append(button);
    // Event listener on butons
      button.addEventListener("click", function(){
      renderTheWeather(saveTheWeather[i]);
    // Displays the HTML containers to show current weather and five day forecase
      currentWeatherContainer.style.display = "block";
      fiveDayForecast.style.display = "flex";
  });
 } 
}
// Calls showExisitingCities 
showExistingCities();


