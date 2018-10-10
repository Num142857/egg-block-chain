'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.api.index);
  router.post('/createAccount', controller.api.createAccount);
  router.get('/getMyBalance', controller.api.getMyBalance);
  router.get('/getAccounts', controller.api.getAccounts);
};
