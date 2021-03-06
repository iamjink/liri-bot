//fetches .env file that user creates. not uploaded on github
require("dotenv").config();

//adds keys from keys.js to a variable
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");

//spotify npm
var Spotify = require("node-spotify-api");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var defaultMovie = "Mr.Nobody";
var defaultSong = "The Sign";
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
                    appendLog();

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

function songs(action) {
    var songname = process.argv[3];

    if (songname == null) {
        var songname = defaultSong;

        spotify
            .search({
                type: 'track',
                query: "The Sign"
            })
            .then(function (response) {
                result = `
            Name of the artist is: ${response.tracks.items[0].artists[0].name}
            Name of the song is: ${"The Sign"}
            Preview link of the song is: ${response.tracks.items[0].preview_url}
            Album the song is from is: ${response.tracks.items[0].album.name}
            `
                console.log(result);
            })
            .catch(function (err) {
                console.log(err);
            });
    } else {
        spotify
            .search({
                type: 'track',
                query: get
            })
            .then(function (response) {
                result = `
            Name of the artist is: ${response.tracks.items[0].artists[0].name}
            Name of the song is: ${get}
            Preview link of the song is: ${response.tracks.items[0].preview_url}
            Album the song is from is: ${response.tracks.items[0].album.name}
            `
                console.log(result);
                appendLog();
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    // spotify.request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
    //     .then(function (response) {
    //         // console.log(response);
    //         result = `
    //        Name of the artist is: ${response.artists[0].name}
    //        Name of the song is: ${response.name}
    //        Preview link of the song is: ${response.album.external_urls.spotify}
    //        Album the song is from is: ${response.album.name}
    //         `
    //         console.log(result);
    //     })
    //     .catch(function (err) {
    //         console.error('Error occurred: ' + err);
    //     });

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
                    appendLog();
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
                    appendLog();
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

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        data = data.split(",");
        var action = data[0];
        var get = data[1];

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
        }
    })
};

function appendLog() {
    fs.appendFile("log.txt", result, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("log.txt was updated!");
    });
};