// Initial array of Comedic Actors
var topics = ["Eddie Murphy", "Jim Carrey", "Jerry Seinfeld", "Kevin Hart", "Will Ferrell", "Robin Williams", "Richard Pryor", "Bill Murray", "John Belushi", "Mel Brooks", "Ben Stiller", "Steve Martin", "Chris Farley", "Seth Rogan", "Steve Carell", "Chris Rock"];

function displayGifs() {

    var topics = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + actorName + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {
    
            // Creating a div to hold the actor gif
            var gifDiv = $("<div class = 'item'>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating an element in memory to have the rating displayed
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag and giving the image tag an src attribute of a proprty pulled off the result item
            var personImage = $("<img>").attr("src", results[i].images.fixed_height_still.url);

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p, personImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
        }
    });

}

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("actor-btn");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("buttons-view").append(a);
    }
}

$("#add-movie").on("click", function(event) {
    event.preventDefault();
    var actor = $("#actor-input").val().trim();
    topics.push(actor);
    renderButtons();
});

$(document).on("click", ".actor-btn", displayGifs);
renderButtons();

