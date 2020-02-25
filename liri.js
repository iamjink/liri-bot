//fetches .env file that user creates. not uploaded on github
require("dotenv").config();

//adds keys from keys.js to a variable
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secrets
});
var defMovie = "Mr.Nobody";
var defSong = require("The Sign")

var action = process.argv[2];
var get = process.argv[3];


switch (action) {
    case "concert-this":
        Bands(get)
        break;

    case "spotify-this-song":
        Bands(get)
        break;

    case "movie-this":
        Bands(get)
        break;

    case "do-what-it-says":
        Bands(get)
        break;
}