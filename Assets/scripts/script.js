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
    var city=$("#search-city").val();
    console.log(city);
    var liEl= $("<li>")
    $("ul").append(liEl);
    liEl.append(city)
    // localStorage.setItem(listOfCities, JSON.stringify(city))
  });

  // working on searching city value and displaying city to the page
//
  function displayCurrentCity(city){

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Atlanta,Georgia&appid=50a87d4b351a7113897cea2824a44158";
      $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            console.log(queryURL)
          console.log(response);
          $('#city-name').html('<h1>' + response.name + ' Weather Details</h1>');
          var tempF = (response.main.temp - 273.15) * 1.8 + 32;
          $('#temperature').text('Temperature (F) ' + tempF.toFixed(2));
          $('#wind-speed').text('Wind Speed: ' + response.wind.speed);
          $('#humidity').text('Humidity: ' + response.main.humidity);
          
        //   $('#uv-index')


  })
  }
  displayCurrentCity();
});
