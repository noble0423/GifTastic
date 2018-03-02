// VARIABLES
// ====================================================================================================================
// Initial array of Comedic Actors
var topics = ["Eddie Murphy", "Jim Carrey", "Jerry Seinfeld", "Larry David", "Kevin Hart", "Will Ferrell", "Robin Williams", "Richard Pryor", "Bill Murray", "John Belushi", "Mel Brooks", "Ben Stiller", "Steve Martin", "Chris Farley", "Seth Rogan","Steve Carell", "Chris Rock"];









// FUNCTIONS AND MAIN PROCESS
// ====================================================================================================================
// Function that re-renders the HTML to display the appropriate content
function displayGifs() {
    var actorName = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    actorName + "&api_key=dc6zaTOxFJmzC&limit=10";
    // AJAX call for the specific actor button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        
        // Creating a div to hold the actor gif
        var actorDiv = $("<div class = 'actor'>");

        // Storing the rating data
        var rating = response.rating;

        // Creating an element in memory to have the rating displayed
        var p = $("<p>").text("Rating: " + rating);

        // Display the rating in HTML
        actorDiv.append(p);

        // Storing the URL for the still gif image
        var imgURL = response.images.fixed_height_still.url;

        // Creating an element to hold the still gif image
        var image = $("<img>").attr("src", imgURL);

        // Display still gif image in HTML
        actorDiv.append(image);
    });
} 

// Function to render buttons
function renderButtons() {
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array  
        var actorButton = $("<button>");
        actorButton.addClass("actor-btn");
        actorButton.attr("data-name", topics[i]);
        actorButton.text(topics[i]);
        console.log(actorButton);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(actorButton);
    }
}






// MAIN PROCESS
// ====================================================================================================================
$(document).ready(function() {
    renderButtons();
});

//displayGifs();