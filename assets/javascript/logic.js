// VARIABLES
// ====================================================================================================================
// Initial array of Comedic Actors
var topics = ["Eddie Murphy", "Jim Carrey", "Melissa McCarthy", "Jerry Seinfeld", "Kevin Hart", "Will Ferrell", "Amy Poehler", "Kristen Wiig", "Robin Williams", "Richard Pryor", "Bill Murray", "John Belushi", "Mel Brooks", "Ben Stiller", "Steve Martin", "Chris Farley", "Seth Rogan","Steve Carell", "Chris Rock"];







// FUNCTIONS AND MAIN PROCESS
// ====================================================================================================================

// Function to render initial buttons
function renderButtons() {
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array  
        var actorButton = $("<button>");
        actorButton.addClass("actor-btn");
        actorButton.attr("data-name", topics[i]);
        actorButton.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(actorButton);
    }

}



$(document).ready(function() {
    renderButtons();
    displayGifs();

    // Function that re-renders the HTML to display the appropriate content
    // Event listener for all button elements
function displayGifs() {
    $("button").on("click", function() {
        var actorName = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        actorName + "&api_key=dc6zaTOxFJmzC&limit=10";
        // AJAX call for the specific actor button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            // Storing an array of results in the results variable
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
                var personImage = $("<img>");
                personImage.addClass("gif");
                personImage.attr("src", results[i].images.fixed_height_still.url);
                personImage.attr("data-still", results[i].images.fixed_height_still.url);
                personImage.attr("data-animate", results[i].images.fixed_height.url)
                personImage.attr("data-state", "still");

                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(p, personImage);

                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#gifs-appear-here").prepend(gifDiv);
            }
            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            })
        });
    })
}

    
    // Function creates new buttons
    $("#add-actor").on("click", function(event) {
        event.preventDefault();
        
        // This line grabs the input from the textbox
        var comedian = $("#actor-input").val().trim();

        // Adding comedian from the textbox to our array
        topics.push(comedian);

        // Calling renderButtons which handles the processing of our topics array
        renderButtons();
        $("#actor-form").get(0).reset();

        $(".actor-btn").on("click", function (){
            //console.log("clicked");
            displayGifs();
            
        })
    })
});

