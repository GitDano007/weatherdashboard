

$('#citySubmit').on('click', function(e) {
    event.preventDefault(e);
    var inputCity= $('#inputCity').val();

    var OW_API_KEY= "84301864d8fc9d004d0764d16da441c4";

    queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&units=imperial&appid=" + OW_API_KEY;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {



        var newCard= $('<div>').addClass('card col-sm-9 mt-3 text-dark'),
            cardBody= $('<div>').addClass('card-body py-1'),

            appendedCard= $(newCard).append(cardBody),

            currentTime= moment().format('MM/DD/YY'),



                    weatherIcon= $("<img src='https://openweathermap.org/img/wn/" + 
                    response.weather[0].icon + ".png' > "),
                    



            lat = response.coord.lat,
            lon = response.coord.lon;

        $.ajax({
            url: uviURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + 
            OW_API_KEY + "&lat=" +lat+ "&lon=" +lon,
            method: "GET"
            })
            .then(function(data){
            addUVI = $('<p>').attr('class','card-text')
            .append("UV Index: " + data.value);

            $(appendedCard).append(addUVI);
            });



        title = $('<h3>').attr('class','card-title').append( response.name + " (" + currentTime + ") "  ).append(weatherIcon);

        temp = $('<p>').attr('class', 'card-text').append("Temperature: " + response.main.temp + "°F");

        humidity = $('<p>').attr('class', 'card-text').append("Humidity: " + response.main.humidity + "%");

        windSpeed = $('<p>').attr('class', 'card-text').append("Wind Speed: " + response.wind.speed + "mph");


        $(appendedCard).append(title, temp, humidity, windSpeed);
    
        $('#dayForecast').append(appendedCard);
    });

    

    $("#inputCity").val("");
});