$(".btn-search").on("click", function (e) {
    e.preventDefault();
    let searchTerm = $("#searchTerm").val();

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&units=imperial&appid=6e386d169b465bbe84362a63b6f2a0b8"

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function (response){
        console.log(response)
    })
})