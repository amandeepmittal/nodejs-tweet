'use strict';
const config = require('../config.js');
const twit = require('twit');
const T = new twit(config.twitter);

function followed(event) {
  console.log('Follow event is running');

  let name = event.source.name;
  screenName = event.source.screen_name;

  tweetNow('Thank you @' + screenName + ' . I hope you get useful information here.');
}

function tweetNow(tweetText) {
  let tweet = {
    status: tweetText
  };

  T.post('statuses/update', tweet, (err, data, response) => {
    if(err) {
      console.log('ERROR: in Follow TWEET');
    }
    console.log('SUCCESS: Repliyed to Follower');
  });
}

module.exports = followed;
