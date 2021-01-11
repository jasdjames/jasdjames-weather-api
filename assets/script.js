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
$("#topText").empty().append(` Temperature: ${tempRound}°F `)
// Icon
var iconCode = (response.list[0].weather[0].icon)

$("#topText").append(`<img id="icon" src="http://openweathermap.org/img/wn/${iconCode}@2x.png"/> `)
    // Humidity 
$("#topText").append(`<p> Humidity: ${response.list[0].main.humidity}% </p>`) 
    // Windspeed 
$("#topText").append(`<p> Windspeed: ${response.list[0].wind.speed} mph </p>`) 
    // UV Index 
 var lat = (response.city.coord.lat)
 console.log((response.city.coord.lat));   
 var lon =(response.city.coord.lon)
 console.log(lon);
 var uvAPI=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api}`
 $.ajax({
    url: uvAPI,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    console.log(response.current.uvi);


if (response.current.uvi < 3){

// change button green
$("#uvBtn").removeClass().addClass("btn btn-success disabled");
} else if (response.current.uvi > 8 ) {
$("#uvBtn").removeClass().addClass("btn btn-danger disabled");  

}else{
    $("#uvBtn").removeClass().addClass("btn btn-warning disabled"); 
}
$("#uvBtn").empty().append(`UV Index: ${response.current.uvi} `)

// figure out how to clear the uv index between clicks

// make button yellow 



  })

 })
}
})