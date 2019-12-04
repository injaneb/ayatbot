'use strict';

module.exports = {
  twitter: {
    consumer_key: process.env.twitterConsumerKey,
    consumer_secret: process.env.twitterConsumerSecret,
    access_token: process.env.twitterAccessToken,
    access_token_secret: process.env.twitterAccessTokenSecret,
    timeout_ms: 60 * 1000,
    strictSSL: true
  },
  telegram: {
    token: process.env.telegramToken,
    chat: process.env.telegramChat
  }
};
