$(document).ready(function () {
  // console.log("Hello")
  // Weather api key
  var apiKey = "50a87d4b351a7113897cea2824a44158";
  //using array for local storage
  var citiesArray = [];
  // Current date displayed
  var currentDate = moment().format("L");
  console.log(currentDate);
  getLocalStorage()
  //checking on search btn
  $("#search-city-btn").on("click", function () {
    event.preventDefault();
    console.log("You have searched!");
    var city = $("#search-city").val();
    console.log(city);
    // var liEl = $("<li>");
    // $("ul").append(liEl);
    // liEl.append(city);
    $("#daily-forecast").empty();
      displayCurrentCity(city)
      citiesArray.push(city);
    localStorage.setItem("cities", JSON.stringify(citiesArray))
   generateButtons();
  });
  function getLocalStorage(){
    var storage = JSON.parse(localStorage.getItem("cities"));
    if (storage !== null) {
        citiesArray = storage;
    }
  }
  //To list searched cities and make them buttons to see weather
  function generateButtons(){
    $("#cities-history").empty();
    for(i=0;i<citiesArray.length;i++){
      var cityButton = $("<button id='city-button'>");
      cityButton.addClass("button").attr("data-name", citiesArray[i]);
      cityButton.text(citiesArray[i])
      $("#cities-history").append(cityButton)
    }
  }
  //When user clicks list of buttons it'll display that city's weather
// $("button").on("click", function(event){
//   event.preventDefault();
//   displayCurrentCity();
// })
  //When button is clicked, event listener listens for user click

  // Still need to work on changing default city to user input....
  //Function to perform AJAX request to display weather of city
  function displayCurrentCity(city) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q="+ city+ "&appid=50a87d4b351a7113897cea2824a44158";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(queryURL);
      console.log(response);
      //icon
      var icon = response.weather[0].icon
      console.log(icon)
      //icon url http://openweathermap.org/img/wn/10d@2x.png
      // var imageIcon= $("<img>").attr("src","http://openweathermap.org/img/w/"+ icon +".png")
      var imageIconURL = "http://openweathermap.org/img/w/" + icon +".png";
      var imgEl = $("<img>").attr("src", imageIconURL)
      $("#city-name").html("<h2>" + response.name + "</h2>");
      var currentDate = moment().format("L");
      var dateEl = $("<span>").text("(" + currentDate + ")");
      $("#city-name").append(dateEl).append(imgEl);
      var tempF = (response.main.temp - 273.15) * 1.8 + 32;
      $("#temperature").text("Temperature: " + tempF.toFixed(2)+ "°F");
      $("#wind-speed").text("Wind Speed: " + response.wind.speed + "MPH");
      $("#humidity").text("Humidity: " + response.main.humidity +"%");

      //UV-Index AJAX Call
      //Setting Latitude and Longitude to var so that it can be accessed easily
      var lat = response.coord.lat;
      // console.log(lat);
      var lon = response.coord.lon;
      // console.log(lon);
      var uvURL =
        "http://api.openweathermap.org/data/2.5/uvi?appid=" +
        apiKey +
        "&lat=" +
        lat +
        "&lon=" +
        lon;
      $.ajax({
        url: uvURL,
        method: "GET",
      }).then(function (response) {
        // console.log(response)
        //Storing the uv value in variable and adding it to span element to be displayed inline the p element of uv-index
        var uvNum = response.value;
        var spanEl = $("<span>").text(uvNum);
        $("#uv-index").text("UV:").append(spanEl);

        //Conditional to color UV-index
        //UV index <3 green
        if (uvNum <= 3) {
          spanEl.css({ "background-color": "green", color: "white" });
        }
        //UV index <7 orange
        spanEl.css({ "background-color": "orange", color: "white" });
        //UV index >7 red
        if (uvNum > 7) {
          spanEl.css({ "background-color": "red", color: "white" });
        }
      });
      //five day forecast
      //append to #daily-forecast
      //how?
      //similar to the other ajax calls

      var forecastURL =
        "https://api.openweathermap.org/data/2.5/forecast?q="+ city+"&appid=" +
        apiKey;
      console.log(forecastURL);
      $.ajax({
        url: forecastURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        console.log(response.list);
        //Iterate through api array to retrieve forecast
        for (var i = 0; i < response.list.length; i++) {
          //retrieve the 5 day forecast of only 3:00pm
            if(response.list[i].dt_txt.indexOf("15:00:00")!== -1){
              var cardDiv = $("<div class='card-body'>")
              //retrieving the daily dates
              $("#daily-forecast").append(cardDiv)
              var dateEl= moment(response.list[i].dt_txt).format("MM/DD/YYYY")
              var forecastDate = $("<h3>").text(dateEl);
              //retrieving the daily temperatures
              var dailyTempEl= (response.list[i].main.temp - 273.15)* 1.80+32;
              var tempEl= $("<p>").text("Temp: " + dailyTempEl.toFixed(2) +"F");
              //retrieving daily humidity
              var dailyHumidityEl= $("<p>").text("Humidity: "+ response.list[i].main.humidity + "%");
              //retrieving weather icons
              var imgIcon2= response.list[i].weather[0].icon;
              var imgIconURL="http://openweathermap.org/img/w/"+ imgIcon2 + ".png"
              var imgEl2 = $("<img>").attr("src", imgIconURL)
              //appending elements
              cardDiv.append(forecastDate).append(imgEl2).append(tempEl).append(dailyHumidityEl)
              $("#daily-forecast").append(cardDiv);
            }
        }
      });
    
    });
  }
});
