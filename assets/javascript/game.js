var tvShows = ["Breaking Bad", "The Office", "Friends", "Brooklyn Nine-Nine", "How I Met Your Mother"];

$(document).ready(function() {
    for (var i = 0; i < tvShows.length; i++) {
        $("#shows-buttons").append("<button type='button' onclick='searchGif(\"" + tvShows[i] + "\")' class='btn btn-secondary' value=' " + tvShows[i] + "'> " + tvShows[i] + " </button>");
    }
});

function showsButtonClicked() {
    var userInput = $('#shows-input').val().trim();
    searchGif(userInput);
}

$(document).on("click", "#add-shows", function(event) {
    event.preventDefault()
    var userInput = $('#shows-input').val().trim();
    if (userInput) {
        $('#shows-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-secondary' value=' " + userInput + "'> " + userInput + " </button>");
    }

});

function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=6supUBfCWnsS3GdCAXenfGRRPJEURsvE&limit=10',
            type: 'GET',
        })
        .done(function(response) {
        displayGif(response);
        })
}

function displayGif(response) {
    $('#shows').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings text-color'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = '<div class="col-md-3">' + image + "</div>";
        $('#shows').append(image);
    }

    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}