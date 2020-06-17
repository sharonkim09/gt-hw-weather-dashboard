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
    var city=$("#search-text").val();
    console.log(city);
    var liEl= $("<li>")
    $("ul").append(liEl);
    liEl.append(city)
    // localStorage.setItem(listOfCities, JSON.stringify(city))
  });

  // working on searching city value and displaying city to the page
//
//   function displayCurrentCity(){

  //     var weatherURL ='https://api.openweathermap.org/data/2.5/weather?'
  //     + 'q=&appid=50a87d4b351a7113897cea2824a44158'
  //     $.ajax({
  //         url: queryURL,
  //         method: "GET"
  //       }).then(function(response) {
  //         console.log(response);
  // })
  // }
  // displayCurrentCity();
});
