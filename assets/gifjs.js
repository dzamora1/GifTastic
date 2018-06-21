
      // Initial array of gifs
      var gifs = ["Nerds", "Gladiators", "Dogs", "skaters"];

      // displaygifInfo function re-renders the HTML to display the appropriate content
      function displaygifInfo() {

        var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ gif + "&api_key=8k0kmNFkvYKtgXskwKymlpYjAofWypwU&limit=10";

        console.log(queryURL);
        // Creating an AJAX call for the specific gif button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

            console.log(queryURL);
    
            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;
    
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
    
                // Creating and storing a div tag
                var gifDiv = $("<div>");
    
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                console.log();
    
                // Creating and storing an image tag
                var gifImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item

                gifImage.addClass('gifImg')

                gifImage.attr('src', results[i].images.fixed_height_still.url);

                gifImage.attr('data-still', results[i].images.fixed_height_still.url)

                gifImage.attr('data-animate', results[i].images.fixed_height.url)

                .attr('data-state', 'still');

                // Appending the paragraph and image tag to the animalDiv
                gifDiv.append(p);
                gifDiv.append(gifImage);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                  $("#gif-view").prepend(gifDiv);
            }

            $('.gifImg').on('click', function() {
            
              var state = $(this).attr('data-state'); 
              console.log(this);

              if (state == 'still') {
              
              $(this).attr('src', $(this).data('animate'));
              
              $(this).attr('data-state', 'animate');

              } else {
                      
              $(this).attr('src', $(this).data('still'));
              
              $(this).attr('data-state', 'still');
              }      
          });
            });
        };







      // Function for displaying gif data
      function renderButtons() {

        // Deleting the gifs prior to adding new gifs
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of gifs
        for (var i = 0; i < gifs.length; i++) {

          // Then dynamicaly generating buttons for each gif in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of gif-btn to our button
          a.addClass("gif-btn");
          // Adding a data-attribute
          a.attr("data-name", gifs[i]);
          // Providing the initial button text
          a.text(gifs[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a gif button is clicked
      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var gif = $("#gif-input").val().trim();

        // Adding gif from the textbox to our array
        gifs.push(gif);

        // Calling renderButtons which handles the processing of our gif array
        renderButtons();
        $("#gif-input").val("");
        
      });

      // Adding a click event listener to all elements with a class of "gif-btn"
      $(document).on("click", ".gif-btn", displaygifInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();