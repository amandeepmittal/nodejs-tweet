'use strict';

const config = require('../config');
const random = require('./random');
const twit = require('twit');
const T = new twit(config.twitter);

const favorite = () => {
  let params = {
    q: '@nodejs OR #nodejs OR #angularjs OR #mongodb OR @angular OR #angular OR @mongodb OR #meanstack OR @npmjs OR #ionicframework OR @Ionicframework OR @NodeUp OR @nodeweeklyfeed',
    result_type: 'recent',
    lang: 'en'
  };

  T.get('search/tweets', params, (err, data) => {
    let tweet = data.statuses;
    let randomTweet = random(tweet);

    if(err) {
      console.log('ERROR: Cannot search tweet');
    }

    if(typeof randomTweet != 'undefined') {
      T.post('favorite/create', {id: randomTweet.id_str}, (err, response) => {
        if(err) {
          console.log('ERROR: in Retweeting');
        }
        console.log('SUCCESS: Favorite tweet Successfull');
      });
    }
  });
}

module.exports = favorite;