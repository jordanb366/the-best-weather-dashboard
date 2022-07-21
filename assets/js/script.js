var APIKey = "da554693696ba932dd638aef86b0e83e";
var userInput = document.querySelector("#user-input");
var cityBtn = document.querySelector("#cityBtn");
var citiesSearchedList = document.querySelector("#cities-searched-list");

var currentWeatherContainer = document.querySelector("#current-weather-container");
var fiveDayForecast = document.querySelector("#five-day-forecast");

   

cityBtn.addEventListener("click", function(event){
    event.preventDefault
   searchCity();
   showCitiesSearched();
}); 



function searchCity(){
    var city = userInput.value;
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + APIKey;
    var secondApiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=5" + "&units=imperial" + "&appid=" + APIKey;
    fetch(apiUrl)
    .then(function (response) {
        return response.json();
     })
     .then(function (data) {
     //Using console.log to examine the data
     console.log(data);

     
    //     // for (var i = 0; i < data.length; i++) {
    //     //   //Creating a h3 element and a p element
    //     //   var userName = document.createElement('h3');
    //     //   var userUrl = document.createElement('p');
  
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


    currentWeatherContainer.append(cityName);
    currentWeatherContainer.append(cityTemp);
    currentWeatherContainer.append(cityWind);
    currentWeatherContainer.append(cityHumidity);

      });
      fetch(secondApiUrl)
      .then(function (response) {
          return response.json();
       })
       .then(function (data) {
      //     //Using console.log to examine the data
       console.log(data);
  
     
    //   var tempNow1 = document.createElement("p");
    //   tempNow1.textContent = "Temp: " + data.list[0].main.temp + " degrees F";
    //   fiveDayForecast.append(tempNow1);

    //   var tempNow2 = document.createElement("p");
    //   tempNow2.textContent = "Temp: " + data.list[1].main.temp + " degrees F";
    //   fiveDayForecast.append(tempNow2);

    //   var tempNow3 = document.createElement("p");
    //   tempNow3.textContent = "Temp: " + data.list[2].main.temp + " degrees F";
    //   fiveDayForecast.append(tempNow3);

    //   var tempNow4 = document.createElement("p");
    //   tempNow4.textContent = "Temp: " + data.list[3].main.temp + " degrees F";
    //   fiveDayForecast.append(tempNow4);

    //   var tempNow5 = document.createElement("p");
    //   tempNow5.textContent = "Temp: " + data.list[4].main.temp + " degrees F";
    //   fiveDayForecast.append(tempNow5);

        //   fiveDayForecast.append(tempNow);

        var tempNow = document.createElement("p");
      for (var i = 0; i < data.list.length; i++) {
        // console.log("Temp: " + data.list[i].main.temp + " degrees F");
  
        console.log(data.list[i].main.temp);
        tempNow.textContent = "Temp: " + data.list[i].main.temp + " degrees F";

        fiveDayForecast.append(tempNow);

       
      }
      
     
        });

}

function showCitiesSearched() {
    var li = document.createElement("li");
    previousCity = userInput.value;
// var userInformation = document.createTextNode(previousCity);
// li.appendChild(userInformation);

li.textContent = previousCity;
    citiesSearchedList.appendChild(li);
}