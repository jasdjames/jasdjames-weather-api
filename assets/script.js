var DateTime = luxon.DateTime;
var dt = DateTime.local();
var Day = $("#dateToday")
var newFormat = Day.text(dt.toLocaleString(DateTime.DATE_HUGE));
var cityName = $("#cityName")
var api = "c5802144e43bf1301ef522550796e16e";








$("#searchBtn").on("click", function (event) {
var searchCity = $("#searchCity").val;
console.log(searchCity);
 if ($(this)){
  
var openURL = `api.openweathermap.org/data/2.5/forecast?q=houston&appid=${api}`
$.ajax({
    url: openURL,
    method: "GET"
  }).then(function(response) {
      console.log(response);
  })

 }
})
