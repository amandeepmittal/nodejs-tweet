'use strict';
/*
  TASKS this bot can do:
  - Retweet (every 10 minutes)
  - THANKYOU Reply to the followers (when followed)
  - Favorite a tweet (every 30 minutes)
*/

// Dependencies =========================
const twit = require('twit');
const config = require('./config');
const T = new twit(config.twitter);

// Import API functions
const retweet = require('./api/retweet');
const favorite = require('./api/favorite');
const followed = require('./api/follow');

// Retweet
setInterval(retweet, config.retweetRate);

// Favorite
setInterval(favorite, config.favoriteRate);

// Follow
const stream = T.stream('user') ;
stream.on('follow', followed);

// // Use Streams API for interacting with a USER ==========
//
// // set up a user stream
// var stream = Twitter.stream('user');
//
// // FOLLOW BOT ===========================
//
// // when someone follows
// stream.on('follow', followed);
//
// // ...trigger the callback
// function followed(event) {
//     console.log('Follow Event is running');
//     //get their twitter handler (screen name)
//     var
//       name = event.source.name,
//       screenName = event.source.screen_name;
//     // function that replies back to the user who followed
//     tweetNow('@' + screenName + ' Thank you. I hope you get some useful information here.');
// }
//
// // function definition to tweet back to user who followed
// function tweetNow(tweetTxt) {
//     var tweet = {
//         status: tweetTxt
//     }
//     Twitter.post('statuses/update', tweet, function(err, data, response) {
//       if(err){
//         console.log("Error in Follow TWEET");
//       }
//       else{
//         console.log("Follow TWEET Working Successfully");
//       }
//     });
// }
//

// // RETWEET @nodeweeklyfeed & 'Node.js Daily' =========================================
// Twitter.get('search/tweets', { q: 'Node.js News', track: '@nodeweeklyfeed, Node.js Daily', count: 100, result_type: 'recent'}, function(err, data, response){
//   // if there no errors
//     if (!err) {
//       // grab ID of tweet to retweet
//         var tweetId = data.statuses[0].id_str;
//         // Tell TWITTER to retweet nodejsweekly
//         Twitter.post('statuses/retweet/:id', {
//             id: tweetId
//         }, function(err, response) {
//             if (response) {
//                 console.log('Retweet NodeWeekly. SUCCESS!!!');
//             }
//             // if there was an error while tweeting
//             if (err) {
//                 console.log('Something went wrong while RETWEETING NodeWeekly... Duplication maybe...ERROR!');
//             }
//         });
//     }
//     // if unable to Search a tweet
//     else {
//       console.log('Something went wrong while SEARCHING NodeWeekly...ERROR!');
//     }
// });
//
// // EOP =============================
