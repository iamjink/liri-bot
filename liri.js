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
var defaultMovie = "Mr.Nobody";
var defSong = "The Sign";
var defaultBand = "Metallica";

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

function bands(action) {
    if (bandname === null) {
        var bandname = defaultBand;
        axios.get("https://rest.bandsintown.com/artists/" + bandname + "/events?app_id=codingbootcamp").then(
                function (response) {
                    result = `
            Name of the band is: ${defaultBand}
            Name of the venue is: ${response.data[0].venue.name}
            Venue location is: ${response.data[0].venue.city}, ${response.data[0].venue.region}, ${response.data[0].venue.country}
            Date of the event is: ${moment(response.data[0].datetime).format('MM/DD/YYYY')}
            `
                    console.log(result);

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
    } else {
        var bandname = get.split(" ").join("+");
        var queryUrl = "https://rest.bandsintown.com/artists/" + bandname + "/events?app_id=codingbootcamp";
        console.log(queryUrl);

        axios.get("https://rest.bandsintown.com/artists/" + bandname + "/events?app_id=codingbootcamp").then(
                function (response) {
                    result = `
                Name of the venue is: ${response.data[0].venue.name}
                Venue location is: ${response.data[0].venue.city}, ${response.data[0].venue.region}, ${response.data[0].venue.country}
                Date of the event is: ${moment(response.data[0].datetime).format('MM/DD/YYYY')}
                `
                    console.log(result);

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

    }


}

function songs() {

}

function movies(get) {
    if (moviename === null) {
        var moviename = defaultMovie;
        var queryUrl = "http://www.omdbapi.com/?t=" + moviename + "&y=&plot=short&apikey=trilogy";
        console.log(queryUrl);

        axios.get("http://www.omdbapi.com/?t=" + moviename + "&y=&plot=short&apikey=trilogy").then(
                function (response) {
                    var result = `
                The movie's Title is: ${response.data.Title}
                The movie's Year is: ${response.data.Year}
                The movie's imbdbRating is: ${response.data.imbdbRating}
                The movie's Rotten Tomatoes Rating is: ${response.data.Ratings[2].Value}
                The movie's Country is: ${response.data.Country}
                The movie's language is: ${response.data.Language}
                The movie's plot is: ${response.data.Plot}
                The movie's actors is: ${response.data.Actors}
                `
                    console.log(result);
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
            })
    } else {

        var moviename = get.split(" ").join("+");

        var queryUrl = "http://www.omdbapi.com/?t=" + moviename + "&y=&plot=short&apikey=trilogy";
        console.log(queryUrl);

        axios.get("http://www.omdbapi.com/?t=" + moviename + "&y=&plot=short&apikey=trilogy").then(
                function (response) {
                    var result = `
                The movie's Title is: ${response.data.Title}
                The movie's Year is: ${response.data.Year}
                The movie's imbdbRating is: ${response.data.imbdbRating}
                The movie's Rotten Tomatoes Rating is: ${response.data.Ratings[2].Value}
                The movie's Country is: ${response.data.Country}
                The movie's language is: ${response.data.Language}
                The movie's plot is: ${response.data.Plot}
                The movie's actors is: ${response.data.Actors}
                `
                    console.log(result);
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
            })
    };

};


// function doWhatItSays() {

// };