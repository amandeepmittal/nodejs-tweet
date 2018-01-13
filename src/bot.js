"use strict";
// Dependencies =========================
const twit = require("twit");
const config = require("./config");
const T = new twit(config.twitter);

// Import API functions
const retweet = require("./api/retweet");
const favorite = require("./api/favorite");
const followed = require("./api/follow");

// Indication Bot refresh
console.log("================");
console.log("== BOT STARTS ==");
console.log("================");

// Retweet
setInterval(retweet, config.retweetRate);

// Favorite
setInterval(favorite, config.favoriteRate);

// Follow
const stream = T.stream("user");
stream.on("follow", followed);
