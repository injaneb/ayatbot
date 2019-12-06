'use strict';

const phin = require('phin');
const dotenv = require('dotenv');
const logger = require('./lib/logger');

dotenv.config();

if (
  !process.env.twitterConsumerKey ||
  !process.env.twitterConsumerSecret ||
  !process.env.twitterAccessToken ||
  !process.env.twitterAccessTokenSecret
) {
  logger('error', 'twitter keys error');
  process.exit(1);
}

if (!process.env.telegramToken || !process.env.telegramChat) {
  logger('error', 'telegram bot token/chat not found');
  process.exit(1);
}

const twitter = require('./clients/twitter');
const telegram = require('./clients/telegram');

async function main() {
  const randAyah = Math.floor(Math.random() * 6236) + 1;
  logger('msg', `ayah's number: ${randAyah}`);

  try {
    let res = await phin({
      url: `http://api.alquran.cloud/v1/ayah/${randAyah}/editions/quran-uthmani`,
      parse: 'json'
    });

    let data = res.body.data[0];
    if (!data || !data.text) {
      throw new Error(`empty data response, ayah number ${randAyah}`);
    } else if (data.text.length > 280) {
      logger('error', `more than 280 chars (${data.text.length})`);
      return main();
    }

    twitter(data.text);
    telegram(data.text);
  } catch (err) {
    logger('error', err);
    return main();
  }
}

main();
setInterval(main, 60 * 60 * 1000);
