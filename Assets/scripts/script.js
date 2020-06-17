$(document).ready(function () {
  // console.log("Hello")
  // Weather api key
  var apiKey = "50a87d4b351a7113897cea2824a44158";
  var cities = [];
  // Current date displayed
  var currentDate = moment().format("L");
  console.log(currentDate);

  //checking on search btn
  $("#search-city-btn").on("click", function () {
    event.preventDefault();
    console.log("You have searched!");
    var city = $("#search-city").val();
    console.log(city);
    var liEl = $("<li>");
    $("ul").append(liEl);
    liEl.append(city);
    // localStorage.setItem(listOfCities, JSON.stringify(city))
  });

  // working on searching city value and displaying city to the page
  //
  function displayCurrentCity(city) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=Atlanta,Georgia&appid=50a87d4b351a7113897cea2824a44158";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(queryURL);
      console.log(response);
      $("#city-name").html("<h1>" + response.name + "</h1>");
      var currentDate = moment().format("L");
      var dateEl = $("<span>").text("(" + currentDate + ")");
      $("#city-name").append(dateEl);
      var tempF = (response.main.temp - 273.15) * 1.8 + 32;
      $("#temperature").text("Temperature (F) " + tempF.toFixed(2));
      $("#wind-speed").text("Wind Speed: " + response.wind.speed);
      $("#humidity").text("Humidity: " + response.main.humidity);

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
        //UV inddex <7 orange
        //UV index >7 red  
        // if()
      });
    });
  }
  displayCurrentCity();
});
