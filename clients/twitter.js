'use strict';

const Twit = require('twit');
const config = require('../config');
const logger = require('../lib/logger');

const bot = new Twit(config.twitter);

module.exports = text => {
  bot.post(
    'statuses/update',
    {
      status: text
    },
    (err, data, res) => {
      if (err) return logger('error', err);
      logger('success', `(twitter): https://twitter.com/${data.user.screen_name}/status/${data.id_str}`);
    }
  );
};
