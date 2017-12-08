// The array that holds the names of the wraths that will start on the page. 
var disaster = ["Earthquake", "Hurricane", "Tornado", "Wildfire", "Tsunami"];
// The array that will hold all of the static image urls.
var staticURL = [];
// The array that will hold all of the animated urls. 
var animatedURL = [];

// This function pretty much does everything. 
function render() {

    // Emptys the button area then makes a new button for each item in the array.
    $("#buttonArea").empty();
    for (var i = 0; i < disaster.length; i++) {
        var newButton = $("<button>");
        newButton.text(disaster[i]);
        newButton.attr("data-name", disaster[i]);
        newButton.addClass("wrath");
        $("#buttonArea").append(newButton);
    };

    // When you click wrath button...
    $(".wrath").click(function () {

        // Emptys the arrays
        animatedURL = [];
        staticURL = [];

        // Emptys the area the gifs go in. 
        $("#gifArea").empty();

        // Plugs the name into the url that will be used with the API
        var replace = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + replace + "&api_key=dc6zaTOxFJmzC&limit=10";

        // calls AJAX 
        $.ajax({ url: queryURL, method: "GET" }).done(function (gif) {

            // Logging to the console for debugging
            console.log(gif);
            console.log(queryURL);

            // Creates the divs and images and appends them to the page
            for (var i = 0; i < 10; i++) {

                animatedURL.push(gif.data[i].images.fixed_height.url);
                staticURL.push(gif.data[i].images.fixed_height_still.url);

                var newDiv = $("<div>");
                newDiv.addClass("gifDiv")

                var p = $("<p>");
                p.text(gif.data[i].rating);

                if (gif.data[i].rating == "") {
                    p.text("n/a")
                };

                var newGif = $("<img>");

                newGif.attr("data-number", i)
                newGif.attr("src", gif.data[i].images.fixed_height_still.url);

                newDiv.append(p);
                newDiv.append(newGif);

                $("#gifArea").append(newDiv);

                //creates the play/pause 
                newGif.click(function () {
                    if ($(this).attr("src") == staticURL[$(this).attr("data-number")]) {
                        $(this).attr("src", animatedURL[$(this).attr("data-number")])
                    } else {
                        $(this).attr("src", staticURL[$(this).attr("data-number")]);
                    };
                });

            };

        });

    });

};

//Initial buttons appear on the page.
render();

// The function that adds wrath button to the button area on click.
$("#addWrath").click(function () {
    var addedButton = $("#inputBox").val();
    $("#inputBox").val(null);
    disaster.push(addedButton);
    render();
});