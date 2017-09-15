var keys=require("./keys");
var request=require("request");
var fs=require('fs');
var moment=require('moment');
var Twitter=require('twitter');
var Spotify=require('node-spotify-api');
//a gets the third command line argument and b gets the fourth command line argument
var a = process.argv[2];
var b = process.argv[3];

//get the twitter keys
var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret,
});

//get the spotify keys
var spotify=new Spotify({
 	id:keys.spotifyKeys.client_id,
 	secret:keys.spotifyKeys.client_secret,
 })

//twitter keys
var key1=client.consumer_key;
var key2=client.consumer_secret;
var key3=client.access_token_key;
var key4=client.access_token_secret;
//spotify keys
var key5=spotify.id;
var key6=spotify.secret;

//the user puts in a third command line argument of movie-this 
if(a==="movie-this")
{
	var queryUrl;
	//no movie is specified
	if(b!=null)
	{
		queryUrl = "http://www.omdbapi.com/?t=" + b + "&y=&plot=short&apikey=40e9cece";
	}
	//a movie is specified
	else
	{
		queryUrl="http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=40e9cece";
	}
	//request for the movie's info, if no movie was specified then get the movie info for Mr. Nobody 
	request(queryUrl,function(error,response,body){
		if(!error&&response.statusCode===200)
		{
			console.log("Release Year: "+JSON.parse(body).Year);
			console.log("Title: "+JSON.parse(body).Title);
			console.log("imdbRating: "+JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Rating: "+JSON.parse(body).Ratings[1].Source);
			console.log("Country: "+JSON.parse(body).Country);
			console.log("Language: "+JSON.parse(body).Language);
			console.log("Actors: "+JSON.parse(body).Actors);
			console.log("Plot: "+JSON.parse(body).Plot);
		}
	});
}
//user enters in my-tweets as a third command line argument
else if(a==="my-tweets")
{
	var params = {screen_name: 'chchen24'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) 
	{
		//gets the last 20 tweets from my twitter account and the date each of the tweets were created
  		if (!error) 
  		{
  			for (var i = 0; i < 20; i++) 
  			{
    			console.log(moment(tweets[i].created_at,'dd MMM DD HH:mm:ss ZZ YYYY').format('MM/DD/YYYY hh:mm'));
    			console.log(tweets[i].text);
    			console.log("------------");
			}
  		}
	});
}
//user enters in spotify-this-song as a third command line argument
else if(a==="spotify-this-song")
{
	var lim=10;
	//if no song was specified as a fourth command line argument, then return the song info for 'The Sign' by "Ace of Base"  
	if(typeof b==="undefined")
	{
  		spotify.search({ type:'track', query: 'The Sign',limit:lim }, function(err, data) {
  			if (err) 
  			{
    			console.log('Error occurred: ' + err);
  			}
  			else
  			{
				for(var d=0;d<lim;d++)
				{
					if((data.tracks.items[d].name==='The Sign')&&(data.tracks.items[d].artists[0].name==='Ace of Base'))
					{
						console.log("Name: "+data.tracks.items[d].name);
						console.log("Album: "+data.tracks.items[d].album.name);
						console.log("Artist: "+data.tracks.items[d].artists[0].name);
						console.log("Link: "+data.tracks.items[d].external_urls.spotify);
						console.log("---------------------");
					}
				}  				
  			}
  
		});
	}
	// return the song info for the song specified as a 4th command line argument
	else
	{
		spotify.search({type:'track',query: "'"+b+"'"},function(err,data){
			if(err)
			{
				console.log("Error occurred: "+err);
			}
			else
			{
				console.log("Name: "+data.tracks.items[0].name);
				console.log("Album: "+data.tracks.items[0].album.name);
				console.log("Artist: "+data.tracks.items[0].artists[0].name);
				console.log("Link: "+data.tracks.items[0].external_urls.spotify);
			}
		});
	}	
}
//user enters in do-what-it-says as command line argument
else if(a==="do-what-it-says")
{
	//reads from the file random.txt
	require("fs").readFile("random.txt", "utf8", function(error, data1)
	{
		//split the data on the comma
		data1.split(", ").forEach(function(val)
		{
			var queryUrl;
			//loop through all the text within the file
			for(var g=0;g<val.length;g++)
			{
				//if there is text that says 'I Want it That Way' then get the song info of 'I Want it That Way' using spotify-this-song 
				if(val.substr(g,g+14)==='I Want it That Way')
				{
					spotify.search({type:'track',query: "'"+val.substr(g,g+14)+"'"},function(err,data)
					{
						if(err)
						{
							console.log("Error occurred: "+err);
						}
						else
						{
							console.log("Name: "+data.tracks.items[0].name);
							console.log("Album: "+data.tracks.items[0].album.name);
							console.log("Artist: "+data.tracks.items[0].artists[0].name);
							console.log("Link: "+data.tracks.items[0].external_urls.spotify);
						}
					});
					
				}
				//if there is text that says 'Happy Gilmore' then get the movie info of 'Happy Gilmore' using movie-this
				if(val.substr(g,g+13)==="Happy Gilmore")
				{
					queryUrl = "http://www.omdbapi.com/?t=" +val.substr(g,g+13) + "&y=&plot=short&apikey=40e9cece";
					request(queryUrl,function(error,response,body)
					{
						if(!error&&response.statusCode===200)
						{
							console.log("Release Year: "+JSON.parse(body).Year);
							console.log("Title: "+JSON.parse(body).Title);
							console.log("imdbRating: "+JSON.parse(body).imdbRating);
							console.log("Rotten Tomatoes Rating: "+JSON.parse(body).Ratings[1].Source);
							console.log("Country: "+JSON.parse(body).Country);
							console.log("Language: "+JSON.parse(body).Language);
							console.log("Actors: "+JSON.parse(body).Actors);
							console.log("Plot: "+JSON.parse(body).Plot);
						}
					});
					
				}
			}			
		});
	});
}
//prompts user to enter in a valid argument
else
{
	console.log("Enter in something valid!");
}