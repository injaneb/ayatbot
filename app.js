'use strict';

const axios = require('axios');
const dotenv = require('dotenv');
const logger = require('./lib/logger');

dotenv.config();

const twitter = require('./clients/twitter');
const telegram = require('./clients/telegram');

function main() {
  const randAyah = Math.floor(Math.random() * 6236) + 1;
  logger('msg', `ayah's number: ${randAyah}`);

  axios
    .get(`http://api.alquran.cloud/v1/ayah/${randAyah}/editions/quran-uthmani`)
    .then(res => {
      const data = res.data.data[0];

      twitter(data.text);
      telegram(data.text);
    })
    .catch(err => logger('error', err));
}

main();
setInterval(main, 60 * 60 * 1000);
