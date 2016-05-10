/*
  TASKS this bot can do:
  - Retweet (every 10 minutes)
  - THANKYOU Reply to the followers (when followed)
  - Favorite a tweet (every 30 minutes)
*/

// Dependencies =========================
var
    twit = require('twit'),
    config = require('./config');

var Twitter = new twit(config);

//  Welcome console message
console.log("NODETWITTERBOT has started");

// Use Streams API for interacting with a USER ==========

// set up a user stream
var stream = Twitter.stream('user');

// FOLLOW BOT ===========================

// when someone follows
stream.on('follow', followed);

// ...trigger the callback
function followed(event) {
    console.log('Follow Event is running');
    //get their twitter handler (screen name)
    var
      name = event.source.name,
      screenName = event.source.screen_name;
    // function that replies back to the user who followed
    tweetNow('@' + screenName + ' Thank you. I hope you get some useful information here.');
}

// function definition to tweet back to user who followed
function tweetNow(tweetTxt) {
    var tweet = {
        status: tweetTxt
    }
    Twitter.post('statuses/update', tweet, function(err, data, response) {
      if(err){
        console.log("Error in Follow TWEET");
      }
      else{
        console.log("Follow TWEET Working Successfully");
      }
    });
}

// RETWEET BOT ==========================

// find latest tweet according the query 'q' in params
var retweet = function() {
    var params = {
        q: '@nodejs OR #nodejs OR #angularjs OR #mongodb OR #meanstack OR @npmjs OR npm',  // REQUIRED
        result_type: 'recent',
        lang: 'en'
    }
    // for more parametes, see: https://dev.twitter.com/rest/reference/get/search/tweets

    Twitter.get('search/tweets', params, function(err, data) {
      // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }
            });
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...');
        }
    });
}

// grab & retweet as soon as program is running...
retweet();
// retweet in every 10 minutes
setInterval(retweet, 600000);

// FAVORITE BOT====================

// find a random tweet and 'favorite' it
var favoriteTweet = function(){
  var params = {
      q: '@nodejs OR #nodejs OR #angularjs OR #mongodb OR #meanstack OR @npmjs OR npm',  // REQUIRED
      result_type: 'recent',
      lang: 'en'
  }
  // for more parametes, see: https://dev.twitter.com/rest/reference

  // find the tweet
  Twitter.get('search/tweets', params, function(err,data){

    // find tweets
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);   // pick a random tweet

    // if random tweet exists
    if(typeof randomTweet != 'undefined'){
      // Tell TWITTER to 'favorite'
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
        // if there was an error while 'favorite'
        if(err){
          console.log('CANNOT BE FAVORITE... Error');
        }
        else{
          console.log('FAVORITED... Success!!!');
        }
      });
    }
  });
}
// grab & 'favorite' as soon as program is running...
favoriteTweet();
// 'favorite' a tweet in every 30 minutes
setInterval(favoriteTweet, 600000*3);   

// function to generate a random tweet tweet
function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};

// EOP =============================
