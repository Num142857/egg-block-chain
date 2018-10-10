'use strict';

module.exports = appInfo => {
  const config = exports = {
    security: {
      csrf: {
        enable: false,
      },
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1526397664692_8510';
  config.web3 = {
    host: 'localhost',
    port: '9546',
    network_id: '*',
  };

  // add your config here
  config.middleware = [];

  return config;
};
