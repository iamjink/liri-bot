//fetches .env file that user creates. not uploaded on github
require("dotenv").config();

//adds keys from keys.js to a variable
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");
// var spotify = new Spotify({
//     id: keys.spotify.id,
//     secret: keys.spotify.secrets
// });
// var defMovie = "Mr.Nobody";
// var defSong = require("The Sign")

var action = process.argv[2];
var get = process.argv[3];


switch (action) {
    case "concert-this":
        bands(get)
        break;

    case "spotify-this-song":
        songs(get)
        break;

    case "movie-this":
        movies(get)
        break;

    case "do-what-it-says":
        doWhatItSays(get)
        break;
}

// function bands(action) {


// }

// function songs() {

// }

function movies(get) {

    var queryUrl = "http://www.omdbapi.com/?t=" + get + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);

    axios.get("http://www.omdbapi.com/?t=" + get + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log("The movie's Title is: " + response.data.Title);
                console.log("The movie's Year is: " + response.data.Year);
                console.log("The movie's imbdbRating is: " + response.data.imbdbRating);
                console.log("The movie's Rotten Tomatoes Rating is: " + response.data.Ratings[2].Value);
                console.log("The movie's Country is: " + response.data.Country);
                console.log("The movie's language is: " + response.data.Language);
                console.log("The movie's plot is: " + response.data.Plot);
                console.log("The movie's actors is: " + response.data.Actors);
            })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);

            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);

        });

};


// function doWhatItSays() {

// };