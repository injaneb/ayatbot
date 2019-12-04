'use strict';

const TelegramBot = require('node-telegram-bot-api');
const config = require('../config');
const logger = require('../lib/logger');

const bot = new TelegramBot(config.telegram.token, { polling: true });

module.exports = text => {
  bot
    .sendMessage(config.telegram.chat, text)
    .then(msg => logger('success', `(telegram): https://t.me/${msg.chat.username}/${msg.message_id}`))
    .catch(err => logger('error', err));
};
