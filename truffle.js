'use strict';
const config = require('./config/config.default')({});

module.exports = {
  networks: {
    development: {
      host: config.web3.host,
      port: config.web3.port,
      network_id: config.web3.network_id,
    },
  },
};

