var twitterKeys = {
  consumer_key: 'bACf5qJxG9Pe950UYkv2TsibB',
  consumer_secret: 'Zhi8uouRMwiXvf4XKC3pBW2ZaIPzqD9BnlJn3rFxOQUqvXg2In',
  access_token_key: '907649155044073473-zuRgnRm0VRBaBHnnqCHhqsTLHZsRD1j',
  access_token_secret: 'efUlG2ttbXHTIfZyXgK8ya9rwaKbGeGQO5VySUNPwJ8r8',
}

var spotifyKeys={
	client_id: "2b0ca12344fb496ea866a1e87d92377c",
	client_secret: "1006da13602d40f9bcec04005766a63b",
}

module.exports.twitterKeys = twitterKeys;
module.exports.spotifyKeys=spotifyKeys;

var fs=require('fs');
//creates a file called random.txt with text of I Want it That Way 
fs.appendFile("random.txt","I Want it That Way",function(err){
	if(err)
	{
		console.log(err);
	}
	else
	{
		console.log("Everything is Okay!")
	}
});
