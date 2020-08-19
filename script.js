$(".btn-search").on("click", function (e) {
    e.preventDefault();


    $(".btn-search").on("click", function () {

        let cityNameInput = $("#citySearch").val();
       
        localStorage.setItem(key, cityNameInput);
        let cityQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityNameInput + "&units=imperial&appid=6e386d169b465bbe84362a63b6f2a0b8";
        var date = new Date();

        var savedCities = localStorage.getItem("savedCities", [])
        $.ajax({
            url: cityQueryURL,
            method: "GET",
        })
            .then(function (response) {
                console.log(response)
            
            var returnedWeather = Object.values(response);
            var returnedWeather2 = Object.values(response.weather[0]);
            cityNM = returnedWeather[11];
            cityName = returnedWeather[11] + "" + "(" + date + ")";
            temperature = returnedWeather[3].temp
            humidity = returnedWeather[3].humidity;
            windSpeed = returnedWeather[5].speed;
            iconNumber = (returnedWeather2[3]);
            latitude = returnedWeather[0].lat;
            longitude = returnedWeather[0].lon;

            let UVQueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=6e386d169b465bbe84362a63b6f2a0b8&lat=" + latitude + "&lon=" + longitude;
            $.ajax({
                url: UVQueryURL,
                method: "GET"
            })
                .then(function (response2) {
                    constreturnedWeather2 = Object.values(response2);
                    var ultraViolet = returnedWeather2[4];

                    let forecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityNM + "&appid=6e386d169b465bbe84362a63b6f2a0b8";
                    $.ajax({
                        url: forecast,
                        method: "GET"
                    })
                        .then(function (response3) {
                            var fiveDayForecast = Object.values(response3);
                            var targetedF5 = fiveDayForecast[3].slice(0, 40);
                            console.log(targetedF5);
                            var wTime = targetedF5[0].dt_txt.substring(11)
                            console.log(wTime);

                            $("#fiveDayForecast").html("");
                            for (var i = 0; i < 40; i++) {
                                var element = targetedF5[i];
                                if (targetedF5[i].dt_txt.substring(11) === "15:00:00") {
                                    var fDate5 = element.dt_txt.slice(5, 10) + "-" + element.dt_txt.slice(0, 4);
                                    var iconNumber5 = element.weather[0].icon;
                                    var temperature5 = ((element.main.temp - 273.15) * 1.80 + 32).toFixed(2);
                                    var humidity5 = element.main.humidity;

                                    var card5 = $("<div>");
                                    card5.attr("class", "card text-white bg-primary mb-2 w-25 blueCard col");
                                    var newResult5 = $("<div>");
                                    newResult5.attr("id", "new-result5");
                                    newResult5.attr("class", "card-body");
                                    var fDateFive = $("<h3>");
                                    fDateFive.attr("class", "card-title").text(fDate5);
                                    fDateFive.attr("id", "dateFont")
                                    var iconNumberFive = $("<h3>");
                                    iconNumberFive.attr("class", "card-text").append("<img src = 'http://openweathermap.org/img/wn/" + iconNumber5 + "@2x.png'>");
                                    var temperatureFive = $("<h3>");
                                    temperatureFive.attr("class", "card-text").text("Temp: " + temperature5 + " °F");
                                    var humidityFive = $("<h3>");
                                    humidityFive.attr("class", "card-text").text("Humidity: " + humidity5 + "%");
                                    newResult5.append(fDateFive, iconNumberFive, temperatureFive, humidityFive);
                                    $("#fiveDayForecast").append(card5);
                                    card5.append(newResult5);
                                }
                            }
                            $("#results").html("");
                            var card = $("<div>");
                            card.attr("class", "card");
                            var newResult = $("<div>");
                            newResult.attr("id", "new-result");
                            newResult.attr("class", "card-body");
                            var cityNameD = $("<h3>");
                            cityNameD.attr("class", "card-title").append(cityName + "<img src = 'http://openweathermap.org/img/wn/" + iconNumber + "@2x.png'>");
                            var temperatureD = $("<h3>");
                            temperatureD.attr("class", "card-text").text("Temperature: " + temperature + " °F");
                            var humidityD = $("<h3>");
                            humidityD.attr("class", "card-text").text("Humidity: " + humidity + "%");
                            var windSpeedD = $("<h3>");
                            windSpeedD.attr("class", "card-text").text("Wind Speed: " + windSpeed + " MPH");
                            var ultraVioletD = $("<h3>");
                            ultraVioletD.attr("class", "card-text").append("UV Index: " + "<ins class = red>"  + ultraViolet + "</ins>")
                            //append to the card
                            newResult.append(cityNameD, temperatureD, humidityD, windSpeedD, ultraVioletD);
                            $("#results").append(card);
                            card.append(newResult);
                            
                            var button2 = $("<button>").attr("class", "btn btn-dark").append(cityNameInput);
                            $("#cityBtn").append(button2);
                            $(".btn-dark").on("click", function(){
                                var weWilSee = localStorage.getItem(key, cityNameInput);
                                console.log(weWilSee);
                                $("#results").attr("style", "display: none");
                                $("#fiveDayForecast").attr("style", "display: none");
                        })
                })
                })

        });
    });
})

