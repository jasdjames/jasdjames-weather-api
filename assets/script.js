$(document).ready(function() {
    searchFunc(localStorage.getItem("value"))
    
})

var DateTime = luxon.DateTime;
var Vt = DateTime.local();
var Day = $("#dateToday")
var newFormat = Day.text(Vt.toLocaleString(DateTime.DATE_HUGE));
var cityName = $("#cityName")
var api = "c5802144e43bf1301ef522550796e16e";
var cityArr = []
var cityArr2 = []





$("#searchBtn").on("click", function () {
    console.log($(this));
    console.log($("#searchCity").val());
 searchFunc($("#searchCity").val())
})
 function searchFunc(searchCity) {
    
        
        console.log(searchCity);
        var openURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=imperial&appid=${api}`
        $.ajax({
            url: openURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(response.city.name);
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
            
            localStorage.setItem("value", searchCity)
            

          if (cityArr2.length> 5){  
          }else{
          cityArr2.push(localStorage.getItem("value"))

           console.log(cityArr2);
          }
        
                        

            
            if (cityArr2.length > 5) {
                cityArr2.splice(0, 1, searchCity)
                console.log(cityArr2);
        

            $("#city1").text("").append(cityArr2[0])
            


            }else {

            $("#city1").text("").append(cityArr2[0])
            $("#city2").text("").append(cityArr2[1])
            $("#city3").text("").append(cityArr2[2])
            $("#city4").text("").append(cityArr2[3])
            $("#city5").text("").append(cityArr2[4])

            }

            
            
         $(".list-group-item").eq(0).addClass("blue")  
           

            // Card 1 
            var dateArr = [response.list[0], response.list[8], response.list[16], response.list[24], response.list[32]];
            console.log(dateArr);
            console.log((DateTime.fromSeconds(dateArr[2].dt)));



            // There is a better way to do this 
            // Will Utterback tried to  help me think of ways to loop through this code - I still am having trouble getting the loops to work 
            // $('card-title').each(function (el) { ? 
            // If data number === # in array --- put the replace the index in dateArr - How do I write that?
            $("#b1Title").empty().append((DateTime.fromSeconds(dateArr[0].dt)).toLocaleString(DateTime.DATE_HUGE))
            $("#b2Title").empty().append((DateTime.fromSeconds(dateArr[1].dt)).toLocaleString(DateTime.DATE_HUGE))
            $("#b3Title").empty().append((DateTime.fromSeconds(dateArr[2].dt)).toLocaleString(DateTime.DATE_HUGE))
            $("#b4Title").empty().append((DateTime.fromSeconds(dateArr[3].dt)).toLocaleString(DateTime.DATE_HUGE))
            $("#b5Title").empty().append((DateTime.fromSeconds(dateArr[4].dt)).toLocaleString(DateTime.DATE_HUGE))

            $("#b1Text").empty().append(`Temperature: ${(Math.round(dateArr[0].main.temp))}°F <img id="icon" src="http://openweathermap.org/img/wn/${dateArr[0].weather[0].icon}@2x.png"/> <p> Humidity: ${dateArr[0].main.humidity}% </p> <p> Windspeed: ${dateArr[0].wind.speed} mph </p>`)
            $("#b2Text").empty().append(`Temperature: ${(Math.round(dateArr[1].main.temp))}°F <img id="icon" src="http://openweathermap.org/img/wn/${dateArr[1].weather[0].icon}@2x.png"/> <p> Humidity: ${dateArr[1].main.humidity}% </p> <p> Windspeed: ${dateArr[1].wind.speed} mph </p>`)
            $("#b3Text").empty().append(`Temperature: ${(Math.round(dateArr[2].main.temp))}°F <img id="icon" src="http://openweathermap.org/img/wn/${dateArr[2].weather[0].icon}@2x.png"/> <p> Humidity: ${dateArr[2].main.humidity}% </p> <p> Windspeed: ${dateArr[2].wind.speed} mph </p>`)
            $("#b4Text").empty().append(`Temperature: ${(Math.round(dateArr[3].main.temp))}°F <img id="icon" src="http://openweathermap.org/img/wn/${dateArr[3].weather[0].icon}@2x.png"/> <p> Humidity: ${dateArr[3].main.humidity}% </p> <p> Windspeed: ${dateArr[3].wind.speed} mph </p>`)
            $("#b5Text").empty().append(`Temperature: ${(Math.round(dateArr[4].main.temp))}°F <img id="icon" src="http://openweathermap.org/img/wn/${dateArr[4].weather[0].icon}@2x.png"/> <p> Humidity: ${dateArr[4].main.humidity}% </p> <p> Windspeed: ${dateArr[4].wind.speed} mph </p>`)




            // UV Index 
            var lat = (response.city.coord.lat)
            console.log((response.city.coord.lat));
            var lon = (response.city.coord.lon)
            console.log(lon);
            var uvAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api}`
            $.ajax({
                url: uvAPI,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                console.log(response.current.uvi);


                if (response.current.uvi < 3) {

                    // change button green
                    $("#uvBtn").removeClass().addClass("btn btn-success disabled");
                } else if (response.current.uvi > 8) {
                    $("#uvBtn").removeClass().addClass("btn btn-danger disabled");

                } else {
                    $("#uvBtn").removeClass().addClass("btn btn-warning disabled");
                }
                $("#uvBtn").empty().append(`UV Index: ${response.current.uvi} `)







            })

        })
    
        
}

$(".list-group-item").on("click", function() {
    console.log($(this).val());
 searchFunc($(this).text());
 
})