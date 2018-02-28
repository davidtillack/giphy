$(document).ready(function(){

// Set the initial displayed Gifs
var personArray = ["Steve Jobs", "Elon Musk", "Bill Gates", "Mark Cuban"];

function displayPersonGif(){
    var person = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=aMksqBB8lNXK020PafTMgQtbNEBy5MBe&q=" + person + "&limit=10&offset=0&rating=G&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        // Empty old gifs before new ones appear
        $("#people-view").empty();
    
        for (var i = 0; i < response.data.length; i++){
            // // Creating a div to hold the person
            var personDiv = $("<div class=people>");

            // Storing the rating data
            var rating = response.data[i].rating;

            // Creating an element to have the rating displayed
            var grabRating = $("<p>");
            
            grabRating.text("Rating: " + rating);

            // Retrieving the URL for the image & gif
            var imgURL = response.data[i].images.fixed_height_still.url;
            console.log(imgURL);
            var gifURL = response.data[i].images.fixed_height.url;
            console.log(gifURL);
            
            // Create class
            var giphy = $("<img>");
            giphy.addClass("gif");

            // Creating an element to hold the image & gif
            giphy.attr("src", imgURL);
            giphy.attr("data-state", "still");
            giphy.attr("data-animate", gifURL);
            giphy.attr("data-still", imgURL);

            // Appending the image & gif
            personDiv.append(giphy);
            personDiv.append(grabRating);
            $("#people-view").prepend(personDiv);

            };

            // When image is clicked on, run between the still and animated 
            $(".gif").on("click",function(){
        
                var state = $(this).attr("data-state");
        
                if (state === "still"){
                var animateGif = $(this).attr("data-animate")
                    $(this).attr("src", animateGif);
                    $(this).attr("data-state", "animate");
                } else {
                var imgURL = $(this).attr("data-still");
                    $(this).attr("src", imgURL);
                    $(this).attr("data-state", "still");
                } 
            });   
      });
    };

    // Function for displaying movie data
    function renderButtons() {

      // Deleting the people prior to adding new people
      // (this is necessary otherwise you will have repeat buttons)
      $("#buttons-view").empty();

      // Looping through the array of people
      for (var i = 0; i < personArray.length; i++) {

        // Then dynamicaly generating buttons for each person in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of person-btn to our button
        a.addClass("person-btn");
        // Adding a data-attribute
        a.attr("data-name", personArray[i]);
        // Providing the initial button text
        a.text(personArray[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
      }
    }

    // This function handles events where a person button is clicked
    $("#add-people").on("click", function(event) {
    event.preventDefault();

      // This line grabs the input from the textbox
      var person = $("#person-input").val().trim();

      // Adding person from the textbox to our array
      personArray.push(person);

      // Calling renderButtons which handles the processing of our person array
      renderButtons();
    });

    
    // Adding a click event listener to all elements with a class of "person-btn"
    $(document).on("click", ".person-btn", displayPersonGif);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

});
