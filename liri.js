require("dotenv").config();

var fs = require('fs');

var request = require("request");

var Spotify = require('node-spotify-api');

// Add the code required to import the keys.js file and store it in a variable. ??????
var keys = require('keys.js');

var twitter = require("twitter");

// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var name = process.argv[3];



// Make it so liri.js can take in one of the following commands:
var command = process.argv[2];

// make if else statements or switch statements so liri.js can take the following commands on the command line

// * `my-tweets`
if (command == 'my-tweets') {
    mytweets();
}
// * `spotify-this-song`
if (command == 'spotify') {
    spotifythissong();
}

// * `movie-this`
if (command == 'movie-this') {
    moviethis(name);

}

// * `do-what-it-says`
if (command == 'says') {
    dowhatitsays();
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    fs.readFile("random.txt", function(error, data){
        if (error) {
            return console.log(error);
          }
    
        else if (data){
            dowhatitsays();
        }
             
    });
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Feel free to change the text in that document to test out the feature for other commands.
}

function mytweets() {
    // for when they call the twitter argument
    // This will show your last 20 tweets and when they were created at in your terminal/bash window.
    function myTweets() {
        var params = { screen_name: "SchlootzMcGootz"}
        client.get("statuses/user_timeline", params, function (error, tweets, response) {
    if (!error) {
        for (var i = 0; i < tweets.length; i++) {
           var date = tweets[i].created_at;
           console.log("@SchlootzMcGootz: " + tweets[i].text + " Created: " + date.substring(0, 19));
        };
    } else {
        console.log("error: " + err);
        return;
        };
 
    });
 
    };
       
}

function spotifythissong() {
    // for when they call the spotify argument
    //     This will show the following information about the song in your terminal/bash window

    // Artist(s)
    // The song's name
    // A preview link of the song from Spotify
    // The album that the song is from

    // If no song is provided then your program will default to "The Sign" by Ace of Base.
    var spotify = new Spotify({
        id: "bfc1e55beead4c959b888186570563b0",
        secret: "5f37c93398254889b601f2df0fa074d2"
      });
       
      spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
 

}

function moviethis(movie_name) {
    // for when they call the movie argument

    // You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.
    request("http://www.omdbapi.com/?t=" + movie_name + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        }
      });


//     This will output the following information to your terminal/bash window:

//    * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.

// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
}

function dowhatitsays() {
    //     Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.


    // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
    // Feel free to change the text in that document to test out the feature for other commands.
}


