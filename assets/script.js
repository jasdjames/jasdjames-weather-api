var DateTime = luxon.DateTime;
var dt = DateTime.local();
var Day = $("#dateToday")
var newFormat = Day.text(dt.toLocaleString(DateTime.DATE_HUGE));
var cityName = $("#cityName")
var api = "c5802144e43bf1301ef522550796e16e";








$("#searchBtn").on("click", function (event) {

 if ($(this)){
var searchCity =$("#searchCity").val();
console.log(searchCity);
var openURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=imperial&appid=${api}`
$.ajax({
    url: openURL,
    method: "GET"
  }).then(function(response) {
      console.log(response);
      console.log (response.city.name);
    //   print the name of the city to the string
    $("#cityName").html(`<h5>${response.city.name}</h5>`);
    
    // Temp
console.log(response.list[0].main.temp)
var tempRound = Math.round(response.list[0].main.temp)
console.log(tempRound);
// $("#topText").empty();
$("#topText").empty().append(` Temperature: ${tempRound}°F`)
    
    

    // Humidity 

    // Windspeed 

    // UV Index 
  })

 }
})

