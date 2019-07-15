# liri-node-app

The LIRI Bot app uses node to take input from terminal inputs and return data to be displayed in the terminal.

It uses the dotenv, moment, fs, node-spotify-api, and axios node packages. Axios is used to retrieve data from 
the OMDB and Bands in Towns APIs

The required packages are listed in package.json.

The node modules and .env are kept off gitub through being listed in the .gitignore file

The app takes four commands.
* concert-this
* spotify-this-song
* movie-this
* do-what-it-says

concert-this runs the getMyBands function, which takes the name of an artist/band and returns a list of upcoming 
concert dates with city, region or country, venue and date.

![concert-this results](/images/concert-this.png)

movie-this runs the getMeMovie function, which takes the title of a film  and returns title, year, rating, imdb rating,
country, language, plot synopsis, actors, and rotten tomatoes rating.

![movie-this results](/images/movie-this.png)

spotify-this-song runs the getMeSpotify function, which takes a song title and returns artist name, song title, preview
url and album title. 

This does not work. It will log error messages, but returns "Cannot read property 'items' of undefined"

Something isn't communicating properly between .env, keys.js and the spotify-node-api. I initially thought it was 
because I took the keys from the solved example, but when I replaced them with my own keys it still did not function.

do-what-it-says takes info from the random.txt file. It functions but will not display the results because of my issue
with Spotify

![do-what-it-says-kinda] (/images/do-what-it-says.png)

The app returns "LIRI doesn't do that" if you enter an invalid command

![LIRI deosn't do that] (/images/liri-no.png)

Data is also logged to log.txt.

