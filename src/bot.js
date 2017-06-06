'use strict';
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
