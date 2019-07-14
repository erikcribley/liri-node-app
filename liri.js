//read and set enviromental variables
require("dotenv").config();

//import API keys
var keys = require("./keys.js");

//spotify
var Spotify = require("node-spotify-api")

//axios
var axios = require("axios")

//moment
var moment = require("moment")

//FS
var fs = require("fs")

//initialize spotify API
var spotify = new Spotify(keys.spotify);

//log.txt
var writeToLog = function(data) {
    fs.appendFile("log.txt", JSON.stringify(data) + "\n", function(err) {
        if (err) {
            return console.log(err)
        }
        console.log("log.txt was updated")
    })
}

// artist's name
var getArtistNames = function(artist) {
    return artist.name
}

//spotify search
var getMeSpotify = function(songName) {
    if (songName === undefined) {
        songName = "What's my age again"
    }
    spotify.search({ type: "track", query: songName}, function(err, data) {
        if (err) {
            console.log("Error occured: " + err)
            return
        }
        var songs = data.track.items
        var data = []
        for (i = 0; i < data.length; i++) {
            data.push({
                "artist(s)": songs[i].artists.map(getArtistNames),
                "song name: ": songs[i].name,
                "preview song ": songs[i].preview_url,
                "album: ": songs[i].album.name
            })
        }
        console.log(data)
        writeToLog(data)
    })
}

//concert search
var getMyBands = function(artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(queryURL).then(
        function(response) {
            var jsonData = response.data
            if (!jsonData.length) {
                console.log("No results found for " + artist)
                return
            }
            var logData = []
            logData.push("Upcoming concerts for " + artist + ":")
            for (i = 0; i < jsonData.length; i++) {
                var show = jsonData[i]
                logData.push(
                    show.venue.city + 
                    "," +
                    (show.venue.region || show.venue.country) +
                    " at " +
                    show.venue.name +
                    " " +
                    moment(show.datetime).format("MM/DD/YYYY") 
                )
            }
            console.log(logData.join("\n"))
            console.log(writeToLog.join("\n"))
        }
    )
}

//movie search
var getMeMovie = function(movieName) {
    if (movieName === undefined) {
        movieName = "Mr Nobody"
    }
    var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy"
    axios.get(urlHit).then(
        function(response) {
            var jsonData = response.data
            var data = {
                "Title:": jsonData.Title,
                "Year:": jsonData.Year,
                "Rated:": jsonData.Rated,
                "IMDB Rating:": jsonData.imdbRating,
                "Country:": jsonData.Country,
                "Language:": jsonData.Language,
                "Plot:": jsonData.Plot,
                "Actors:": jsonData.Actors,
                "Rotten Tomatoes Rating:": jsonData.Ratings[1].Value
            }
            console.log(data)
            writeToLog(data)
        }
    )
} 

//running a command based on a text file
var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function(error, data){
        console.log(data)
        var dataArr = data.split(",")
        if (dataArr.length === 2) {
            pick(dataArr[0], dataArr[1])
        } else if (dataArr.length === 1) {
            pick(dataArr[0])
        }
    })
}

//determining which command is executed
var pick = function(caseData, functionData) {
    switch (caseData) {
        case "concert-this":
            getMyBands(functionData)
            break
        case "spotify-this-song":
            getMeSpotify(functionData)
            break
        case "movie-this":
            getMeMovie(functionData)
            break
        case "do-what-it-says":
            doWhatItSays(functionData)
            break
        default:
            console.log("LIRI doesn't do that")
    }
}

//takes in command line arguments and executes correct function
var runThis = function(argOne, argTwo) {
    pick (argOne, argTwo)
}

//MAIN PROCESS
runThis(proccess.argv[2], process.argv.slice(3).join(" "))