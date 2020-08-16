$(".btn-search").on("click", function (e) {
    e.preventDefault();


    let searchTerm = $("#searchTerm").val();

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&units=imperial&appid=6e386d169b465bbe84362a63b6f2a0b8"

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            console.log(response)

            //City Name
            let cityNameAjax = response.name
            console.log(cityNameAjax)
           let cityName = $("<h1>")
            cityName.attr("style", "font-weight: Bold").text(cityNameAjax)
            console.log(cityName)
            $("#forecastToday").prepend(cityName)

            //Temp
            let tempAjax = response.main.temp
            console.log(tempAjax)
            let temp = $("<h5>")
            temp.attr("style", "font-weight: Bold").text("Temperature: " + (temp))
            $("#forecastToday").append(temp)

            //Humidity
            let humidAjax = response.main.humidity
            console.log(humidAjax)
            let humid =$("<h5>")
            humid.attr("style", "font-weight: Bold").text("Humidity: " + humid)
            $("#forecastToday").append(humid)

            //Wind Speed
            let windAjax = response.wind.speed
            let wind = $("<h5>")
            wind.attr("style", "font-weight: Bold").text("Wind Speed: " + wind)
            $("#forecastToday").append(wind)

            //UVIndex
            let uvAjax = response.main.uvi
            let uvi = $("<h6>")
            uvi.attr("style", "font-weight: Bold").text("UV Index: " + uvAjax)
            $("#forecastToday").append(uvi)
           

            
           

           


        })

})