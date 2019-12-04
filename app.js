'use strict';

const axios = require('axios').default;
const dotenv = require('dotenv');
const logger = require('./lib/logger');

const twitter = require('./clients/twitter');
const telegram = require('./clients/telegram');

dotenv.config();

const randAyah = Math.floor(Math.random() * 6236) + 1;

axios
  .get(`http://api.alquran.cloud/v1/ayah/${randAyah}/editions/quran-uthmani`)
  .then(res => {
    const data = res.data.data[0];
    twitter(data.text);
    telegram(data.text);
  })
  .catch(err => logger('error', err));
